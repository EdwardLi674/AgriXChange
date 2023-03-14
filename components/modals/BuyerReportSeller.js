import React, { useEffect, useState, useContext, Fragment } from "react";
import { Award, Printer, MessageCircle } from "react-feather";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Container,
  Table,
} from "reactstrap";
import getConfig from "next/config";
import { getFormClient } from "../../services/constants";
import { post } from "../../services/axios";
import SettingConext from "../../helpers/theme-setting/SettingContext";
import { AuthContext } from "../../helpers/auth/AuthContext";

const { publicRuntimeConfig } = getConfig();
const apiUrl = `${publicRuntimeConfig.API_URL}`;
const contentsUrl = `${publicRuntimeConfig.CONTENTS_URL}`;

const BuyerReportModal = ({ isShow, onToggle, buyer, onLimited }) => {
  const settingContext = useContext(SettingConext);
  const produce_types = settingContext.appData.produce_types;
  const produce_sizes = settingContext.appData.produce_sizes;
  const produce_packaging = settingContext.appData.produce_packaging;
  const produce_farming_method = settingContext.appData.produce_farming_method;

  const authContext = useContext(AuthContext);
  const user = authContext.user;

  const blockBuyer = () => {};

  const [isShowFollowings, setIsShowFollowings] = useState(false);
  const [sellers, setSellers] = useState([]);
  const [buyerFollowingProduces, setBuyerFollowingProduces] = useState([]);
  const [buyerFollowingSellers, setBuyerFollowingSellers] = useState([]);

  useEffect(() => {
    const getSellers = async () => {
      let formData = getFormClient();
      formData.append("api_method", "list_users");
      formData.append(
        "get_linked_data",
        "countryISbb_agrix_countriesID, regionISbb_agrix_countriesID, cityISbb_agrix_countriesID"
      );
      formData.append("typeISbb_agrix_users_typesID", 2);
      try {
        const response = await post(apiUrl, formData);
        if (response.data.message === "SUCCESS") {
          setSellers(response.data.list);
        } else if (response.data.error) {
          alert(response.data.message);
        }
      } catch (err) {
        alert(err.toString());
      }
    };

    const getBuyerFollowings = async () => {
      let formData = getFormClient();
      formData.append("api_method", "list_users_favourites");
      formData.append("get_linked_data", "1");
      formData.append("userISbb_agrix_usersID", buyer.numeric_id);
      try {
        const response = await post(apiUrl, formData);
        if (response.data.message === "SUCCESS") {
          const buyerFollowings = response.data.list;
          const followingProduces = buyerFollowings.filter(
            (following) =>
              following.fav_produceISbb_agrix_users_produceID !== null
          );
          setBuyerFollowingProduces(followingProduces);
          const followingSellers = buyerFollowings.filter(
            (following) => following.fav_userISbb_agrix_usersID !== null
          );
          setBuyerFollowingSellers(followingSellers);
        } else if (response.data.error) {
          alert(response.data.message);
        }
      } catch (err) {
        alert(err.toString());
      }
    };

    getSellers();

    if (buyer.numeric_id) getBuyerFollowings();
  }, [buyer]);

  const onBuyerFollowingsClickec = () => {
    if (
      user.membershipISbb_agrix_membership_typesID === "3" ||
      user.membershipISbb_agrix_membership_typesID === "2"
    ) {
      onLimited();
      return;
    }
    setIsShowFollowings(!isShowFollowings);
  };

  const onPrinterClicked = () => {
    if (
      user.membershipISbb_agrix_membership_typesID === "3" ||
      user.membershipISbb_agrix_membership_typesID === "2"
    ) {
      onLimited();
      return;
    }
    window.open(`/seller/buyerpdf/${buyer.numeric_id}`, "_blank");
  };

  return (
    <Modal centered isOpen={isShow} toggle={onToggle} className="modal-lg">
      <ModalHeader toggle={onToggle}>Buyer Report</ModalHeader>
      <ModalBody className="p-3">
        <section className="ratio_45 section-b-space">
          <Container>
            <div className="mb-4">
              <h5>
                {buyer.company ?? ""}
                {/* <Award size="20" color="#fd7e14" /> */}
              </h5>
              <div>{buyer.companysummaryISsmallplaintextbox} </div>
            </div>
            <Row className="mb-4">
              <Col md="5">
                <img
                  src={
                    buyer.companylogoISfile
                      ? `${contentsUrl}${buyer.companylogoISfile}`
                      : `/assets/images/ad-space/519183322.jpg`
                  }
                  alt={`${buyer.first_name} ${buyer.last_name}`}
                  className="img-fluid image_zoom_1 blur-up lazyloaded"
                  style={{ width: "100%" }}
                />
              </Col>
              <Col md="6">
                <div className="buyer-info">
                  <h5>{`${buyer.first_name} ${buyer.last_name}`}</h5>
                  <h6>Tel: {buyer.telephone}</h6>
                  <h6>Email: {buyer.email}</h6>
                  <h6>Website: {buyer.website_url}</h6>
                  <h6>
                    Address:{" "}
                    {buyer.countryISbb_agrix_countriesID_data
                      ? buyer.countryISbb_agrix_countriesID_data.name
                      : ""}
                    &nbsp;
                    {buyer.regionISbb_agrix_countriesID_data
                      ? buyer.regionISbb_agrix_countriesID_data.name
                      : ""}
                    &nbsp;
                    {buyer.cityISbb_agrix_countriesID_data
                      ? buyer.cityISbb_agrix_countriesID_data.name
                      : ""}
                    &nbsp;
                  </h6>
                  <h6>
                    {buyer.address_line_1 ?? ""}&nbsp;
                    {buyer.address_line_2 ?? ""}
                  </h6>
                  <h6></h6>
                </div>
                <div>
                  <button className="btn btn-solid btn-default-plan btn-post mr-3">
                    <i className="fa fa-comments" aria-hidden="true"></i>
                    <span className="pl-2 fs-15">Message</span>
                  </button>
                  <button
                    className="btn btn-solid btn-blue-plan btn-post"
                    onClick={blockBuyer}
                  >
                    <i className="fa fa-eye-slash" aria-hidden="true"></i>
                    <span className="pl-2 fs-15">Block Buyer</span>
                  </button>
                </div>
              </Col>
            </Row>
            <div className="mb-3">
              {buyer.companydescriptionISsmallplaintextbox}
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <button
                className="btn btn-primary"
                onClick={onBuyerFollowingsClickec}
              >
                <span className="pl-2 fs-15">
                  Click here to see who this buyer is following
                </span>
              </button>
              <div style={{ cursor: "pointer" }} onClick={onPrinterClicked}>
                <Printer />
              </div>
            </div>
            {isShowFollowings && (
              <Fragment>
                <div className="mt-4">
                  <h5>Produce this buyer is following</h5>
                  <Table bordered responsive>
                    <thead>
                      <tr>
                        <th>Produce</th>
                        <th>Size</th>
                        <th>Packaging</th>
                        <th>Farming Method</th>
                        <th>Season(Storage)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buyerFollowingProduces.map((followingProduce) => {
                        console.log(followingProduce);
                        let produce = null;
                        let size = "";
                        let packaging = "";
                        let farming = "";
                        let season = "";
                        if (
                          followingProduce.fav_produceISbb_agrix_users_produceID_data
                        ) {
                          const favouriteData =
                            followingProduce.fav_produceISbb_agrix_users_produceID_data;
                          produce = produce_types.find(
                            (pt) =>
                              pt.numeric_id ===
                              favouriteData.produce_sub_categoryISbb_agrix_produce_typesID
                          );
                          size = produce_sizes.find(
                            (ps) =>
                              ps.numeric_id ===
                              favouriteData.sizeISbb_agrix_produce_sizesID
                          );
                          packaging = produce_packaging.find(
                            (pp) =>
                              pp.numeric_id ===
                              favouriteData.packagingISbb_agrix_produce_packagingID
                          );
                          farming = produce_farming_method.find(
                            (pf) =>
                              pf.numeric_id ===
                              favouriteData.farming_methodISbb_agrix_produce_farming_methodID
                          );
                          season = favouriteData.produce_storage_season
                            ? JSON.parse(
                                favouriteData.produce_storage_season
                              ).join(",")
                            : "";
                        }

                        return (
                          produce && (
                            <tr key={followingProduce._id}>
                              <td>{produce.name}</td>
                              <td>{size?.name}</td>
                              <td>{packaging?.name}</td>
                              <td>{farming?.name}</td>
                              <td>{season}</td>
                            </tr>
                          )
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
                <div className="mt-4">
                  <h5>Sellers this buyer is following</h5>
                  <Table bordered responsive>
                    <thead>
                      <tr>
                        <th>Seller</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Company</th>
                        <th>Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buyerFollowingSellers.map((followingSeller) => {
                        const seller = sellers.find(
                          (s) =>
                            s.numeric_id ===
                            followingSeller.fav_userISbb_agrix_usersID
                        );

                        return (
                          seller && (
                            <tr key={followingSeller._id}>
                              <td>
                                {seller.first_name + " " + seller.last_name}
                              </td>
                              <td>{seller.email}</td>
                              <td>{seller.telephone ?? ""}</td>
                              <td>{seller.company ?? ""}</td>
                              <td>
                                {(seller.countryISbb_agrix_countriesID_data
                                  ? seller.countryISbb_agrix_countriesID_data
                                      .name
                                  : "") +
                                  " " +
                                  (seller.regionISbb_agrix_countriesID_data
                                    ? seller.regionISbb_agrix_countriesID_data
                                        .name
                                    : "") +
                                  " " +
                                  (seller.cityISbb_agrix_countriesID_data
                                    ? seller.cityISbb_agrix_countriesID_data
                                        .name
                                    : "")}
                              </td>
                            </tr>
                          )
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </Fragment>
            )}
          </Container>
        </section>
      </ModalBody>
    </Modal>
  );
};

export default BuyerReportModal;
