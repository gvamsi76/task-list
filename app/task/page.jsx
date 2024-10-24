"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Spinner, Table } from 'react-bootstrap';
import PageTitleBox from '../components/PageTitleBox';
import { parse } from 'date-fns';

function TaskList() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://ditscrm.divsolution.com/task-Api`);
      console.log(response, "response")
      if (response.status === 200) {
        setFilteredData(response.data.data);
        setData(response.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = data.filter((item) =>
      item.fullName.toLowerCase().includes(searchValue) ||
      item.phoneNumber.includes(searchValue) ||
      item.email.toLowerCase().includes(searchValue) ||
      item.adId.toLowerCase().includes(searchValue) ||
      item.CampanName.toLowerCase().includes(searchValue) ||
      item.postCode.toLowerCase().includes(searchValue)
    );

    setFilteredData(filtered);
  };

  const handleDateFilter = () => {
    if (!fromDate || !toDate) return;

    const from = new Date(fromDate);
    const to = new Date(toDate);

    const filtered = data.filter((item) => {
      const itemDate = parse(item.createdTime, 'dd/MM/yyyy hh:mm:ss a', new Date());
      return itemDate >= from && itemDate <= to;
    });

    setFilteredData(filtered);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <Container >
      <PageTitleBox
        name="Tasks"
        title="Tasks"
        pageTitle="Tasks / Task List"
        rightItem={
          <Row>
            <Col md={3}>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="form-control"
              />
            </Col>
            <Col md={3}>
              <div className="mb-3">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="form-control"
                  placeholder='From Date'

                />
              </div>
            </Col>
            <Col md={3}>
              <div>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="form-control"
                  placeholder='To Date'
                />
              </div>
            </Col>
            <Col md={2}>
            <div className='mb-3'>
                <button onClick={handleDateFilter} className="btn btn-primary mt-2">
                  Filter by Date
                </button>
            </div>
            </Col>
            {/* <Link to="add"> */}
            {/* <Button variant="primary" className="btn ms-4 px-4">
               <i className="fa fa-solid fa-plus mx-1"></i>
               Add
             </Button> */}
            {/* </Link> */}
          </Row>
        }
      />
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: 'calc(100vh - 200px)' }}
        >
          <div className="fs-14 app-loader">
            <Spinner animation="border" size="sm" />
          </div>
        </div>
      ) : (
        <Card className="border-1 p-3 shadow-sm">
          <div className="table-responsive overflow-auto">
            <Table>
              <thead>
                <tr >
                  <th>Full Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Ad Id </th>
                  <th>CampanName</th>
                  <th>postCode</th>
                </tr>
              </thead>
              <tbody>
                {filteredData &&
                  filteredData?.map((item, index) => (
                    <tr key={index} role='button'>
                      <td>{item?.fullName}</td>
                      <td>{item?.phoneNumber}</td>
                      <td>{item?.email}</td>
                      <td>{item?.adId}</td>
                      <td>{item?.CampanName}</td>
                      <td>{item?.postCode}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Card>
      )}
    </Container>
  )
}

export default TaskList