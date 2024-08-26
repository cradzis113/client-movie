import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import SidebarDesktop from "../../component/sidebar/sidebarDesktop";
import SidebarMobile from '../../component/sidebar/sidebarMobile';
import AddItem from '../../component/addItem/addItem';
import Catalogs from '../../component/catalogs/catalogs';
import Dashboard from './dashboardLayout';
import WaitingHall from './waitingHallLayout';
import EditProfilePage from './editLayout';
import fetchData from '../../utils/fetchData';
import { useEffect, useState } from 'react';

function MainAdminLayout() {
  const isMobile = useMediaQuery('(max-width:677px)');

  return (
    <div>
      {isMobile ? (
        <div style={{ display: 'flex', marginTop: 80 }}>
          <SidebarMobile />
          <CategoryComponent />
        </div>
      ) : (
        <div style={{ display: 'flex' }}>
          <SidebarDesktop />
          <CategoryComponent />
        </div>
      )
      }
    </div>
  );
}

function CategoryComponent() {
  const [data, setData] = useState([])
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(null);

  async function getData() {
    try {
      const data = await fetchData('get', 'user', 'getdata');
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const checkData = data.some(item => item.title.toLowerCase().replaceAll(' ', '-') === id);
    setIsEditing(checkData);

  }, [data, id])

  if (isEditing) {
    return <EditProfilePage />
  } else if (!isEditing && location.pathname.split('/')[2] === 'edit-item') {
    navigate('/err')
  }

  switch (location.pathname) {
    case '/admin/add-item':
      return <AddItem />;
    case '/admin/dashboard':
      return <Dashboard />;
    case '/admin/catalog':
      return <Catalogs />;
    default:
      return <WaitingHall />
  }
}

export default MainAdminLayout;
