import './listAuthers.scss'
import { DataGrid } from '@mui/x-data-grid';
import {Delete} from '@mui/icons-material';
import {Link} from 'react-router-dom'
import Helmet from '../../components/helmets/Helmet';
import {useContext, useEffect} from 'react'
import {ListUsersContext} from '../../context/listUsersContext/ListUsersContext'
import {AuthContext} from '../../context/authContext/AuthContext'
import {getListsUser, deleteUser} from '../../context/listUsersContext/apiCalls'

const ListAuthers = () => {
  const {listUsers, dispatch} = useContext(ListUsersContext)
  const {user} = useContext(AuthContext)

  const handleDelete = (id) => {
    deleteUser(dispatch, id)
  }

  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    {
      field: 'infoUser',
      headerName: 'User name',
      width: 200,
      renderCell: (params) => (
        <div className='listAuthors__name'>
          <img src={params.row.profilePicture} alt="img-profile" />
          {params.row.username}
        </div>
      )
    },
    { field: 'email', 
      headerName: 'Email', 
      width: 250,
    },
    { field: 'genre', headerName: 'Genre', width: 80 },
    { 
      field: 'action', 
      headerName: 'Actions', 
      width: 150 ,
      renderCell: (params) => (
        <div className='listAuthors__action'>
          <Link 
            to= {`/info/${params.row._id}`}
            state={params.row}
          >
            <button>view</button>
          </Link>
          {
            user.isAdmin && 
              <Delete 
                className='listAuthors__action--delete'
                onClick={() => handleDelete(params.row._id)}
              />
          }
        </div>
      )
    },
  ];
  useEffect(() => {
    getListsUser(dispatch)
  }, [dispatch])
  return (
    <Helmet title='List Authors'>
      <div className='listAuthors'>
        <h2 className="listAuthors__title">list authors</h2>
        <DataGrid
          rows={listUsers}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(r) => r._id}
          className='listAuthors__data'
        />
      </div>
    </Helmet>
  )
}

export default ListAuthers