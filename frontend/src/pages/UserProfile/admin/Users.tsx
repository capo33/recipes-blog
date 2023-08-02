import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

import {
  deleteUserProfileByAdmin,
  getAllUsers,
} from "../../../redux/feature/Auth/authSlice";
import { capitalize } from "../../../utils";
import { useAppSelector, useAppDispatch } from "../../../redux/app/store";

const Users = () => {
  const { user, users } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = user?.token as string;

  useEffect(() => {
    dispatch(getAllUsers(token));
  }, [token, dispatch]);

  // Delete User
  const handleDeleteProfile = (id: string) => {
    if(id === user?._id) {
      toast.error("You cannot delete your profile, please contact the developer.");
      return;
    }
    dispatch(
      deleteUserProfileByAdmin({
        userId: id as string,
        token,
        toast,
        navigate,
      })
    );
  };

  return (
    <Container>
      <div className='px-4 my-5 text-center'>
        <h1 className='display-5 fw-bold'>All Categories for Admin</h1>
        <div className='col-lg-6 mx-auto'>
          <p className='lead'>Edit or delete categories for your recipe.</p>
        </div>
      </div>
      <Row>
        <Col md={12}>
          <Table striped variant='success' bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>User name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users?.map((user) => (
                  <tr key={user._id}>
                    <td className='border px-4 py-2'>
                      <img
                        src={user?.image}
                        alt=''
                        className='img-fluid rounded-circle'
                        style={{ width: "30px", height: "30px" }}
                      />
                    </td>
                    <td className='border px-4 py-2'>
                      {capitalize(user.name)}
                    </td>

                    <td className='border px-4 py-2'>{user.email}</td>

                    <td className='border px-4 py-2'>{user.phone}</td>

                    <td className='border px-4 py-2'>{user.address}</td>

                    <td className='border px-4 py-2'>
                      <Button
                        onClick={() => handleDeleteProfile(user._id as string)}
                        variant='outline-danger'
                        size='sm'
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
