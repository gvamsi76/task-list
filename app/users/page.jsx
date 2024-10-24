"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner, Table } from "react-bootstrap";
import axiosInstance from "../api/axiosInstance";
import PageTitleBox from "../components/PageTitleBox";
import { useRouter } from "next/navigation";

export default function Users() {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const router = useRouter()

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`https://api.aroundme.co.in/businessapp/BusinessOwnerView`)
      console.log(response, "response")
      if (response.status === 200) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <Container >
     <PageTitleBox
        name="Users"
        title="Users"
        pageTitle="Users / Users List"
        rightItem={
          <Row>
          </Row>
        }
      />
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: 'calc(100vh - 200px)' }}
        >
          <div className="fs-14 app-loader">
            <Spinner animation="border"  size="sm" />
          </div>
        </div>
      ) : (
        <Card className="border-1 p-3 shadow-sm">
          <div className="table-responsive overflow-auto">
            <Table>
              <thead>
                <tr >
                  <th>Bussiness Logo</th>
                  <th>Business Name</th>
                  <th>Business Category</th>
                  <th>City</th>
                  <th>State </th>
                  <th>pincode</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((item, index) => (
                    <tr key={index} role="button" onClick={() => router.push(`/users/${item?.id}`)}>
                      <td>
                        <Image src={item?.business_logo} alt="" width={50} height={50}/>
                      </td>
                      <td>{item?.business_name ? item?.business_name : "-----"}</td>
                      <td>{item?.category}</td>
                      <td>{item?.city_name}</td>
                      <td>{item?.state}</td>
                      <td>{item?.pincode}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Card>
      )}
    </Container>
  );
}
