import {
    Home,
    Box,
    DollarSign,
    Tag,
    Clipboard,
    Camera,
    AlignLeft,
    User,
    Users,
    UserX,
    Chrome,
    Book,
    BookOpen,
    Info,
    Inbox,
    BarChart, Settings, Archive, LogIn
} from 'react-feather';


export const MENUITEMS = [
    { path: '/', title: 'HOME', type: 'link' },
    { path: '/about-us', title: 'ABOUT US', type: 'link' },
    { title: 'MEMBERSHIP PLANS', type: 'modal', id: "membership_plans" },
    { title: 'PRODUCE', type: 'modal', target: '.produce-modal' },
    { path: '/reports', title: 'REPORTS', type: 'link' },
]


export const SELLERMENUITEMS = [
    {
        path: '/seller/dashboard', title: 'Dashboard', icon: Home, type: 'link', badgeType: 'primary', active: false
    },
    {
        title: 'My Page Setup', path: '/seller/page', icon: User, type: 'link', active: false
    },
    {
        title: 'My Adverts', path: '/seller/adverts', icon: Users, type: 'link', active: false
    },
    {
        title: 'My Produce', path: '/seller/produce', icon: Box, type: 'link', active: false
    },
    {
        title: 'Price & Availablity', path: '/seller/price', icon: DollarSign, type: 'link', active: false
    },
    {
        title: 'Buyer Report', path: '/seller/breports', icon: Book, type: 'link', active: false
    },
    {
        title: 'My Invoice', path: '/seller/invoice', icon: Info, type: 'link', active: false
    },
    {
        title: 'My Reports', path: '/seller/reports', icon: BookOpen, type: 'link', active: false
    },

]


export const BUYERMENUITEMS = [
    {
        path: '/buyer/dashboard', title: 'Dashboard', icon: Home, type: 'link', badgeType: 'primary', active: false
    },
    {
        title: 'My Page Setup', path: '/buyer/page', icon: User, type: 'link', active: false
    },
    {
        title: 'Favourite Produce', path: '/buyer/favourite-produce', icon: Box, type: 'link', active: false
    },
    {
        title: 'Favourite Sellers', path: '/buyer/favourite-seller', icon: Users, type: 'link', active: false
    },
    {
        title: 'My Invoice', path: '/buyer/invoice', icon: Info, type: 'link', active: false
    },
    {
        title: 'Reports', path: '/report', icon: BookOpen, type: 'link', active: false
    },

]
