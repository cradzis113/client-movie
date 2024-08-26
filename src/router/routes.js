import MainLayout from '../layout/userLayout/mainLayout';
import WatchLayout from '../layout/userLayout/watchLayout';
import MainAdminLayout from '../layout/adminLayout/mainAdminLayout';
import GridLayout from '../layout/userLayout/gridLayout';
import PageError from '../page/pageError';
import EditLayout from '../layout/adminLayout/editLayout';
import SearchLayout from '../layout/userLayout/searchLayout';

const path = [
    //main layout
    { path: '/', page: MainLayout },

    //watch route
    { path: '/movie/:id/:slug?', page: WatchLayout },

    //phim route
    { path: '/phim-bo', page: GridLayout, hasGrid: true },
    { path: '/phim-le', page: GridLayout, hasGrid: true },
    { path: '/phim-rap', page: GridLayout, hasGrid: true },

    //admin route
    { path: '/admin', page: MainAdminLayout },
    { path: '/admin/dashboard', page: MainAdminLayout },
    { path: '/admin/catalog', page: MainAdminLayout },
    { path: '/admin/add-item', page: MainAdminLayout },
    { path: '/admin/edit-item/:id', page: EditLayout },

    //admin and user route
    { path: '/movie-search/:id?', page: SearchLayout },

    //error route
    { path: '/error', page: PageError },
    { path: '*', page: PageError },
];

export default path;
