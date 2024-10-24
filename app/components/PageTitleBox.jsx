import React from "react";
import { Row, Col } from "react-bootstrap";


const PageTitleBox = ({ name, pageTitle, rightItem, title }) => {
   
	return (
		<Row>
			<Col>
				<div className="page-title-box align-items-end">
					<div>
						<h3 className="mb-1 h3 fw-600">{title || user?.TeamName}</h3>
						<h4 className="page-title text-muted">{pageTitle}</h4>
					</div>
					<div className="page-title-right">{rightItem}</div>
				</div>
			</Col>
		</Row>
	);
};

export default PageTitleBox;
