import React from "react";
import { Card, Col, Badge, Stack, Row } from "react-bootstrap";
import { meta } from "../../utils/avatarNFT";

interface props {
    nft : meta
}

const UserNftCard:React.FC<props> = ({ nft }) => {

  return (
    <Col key={nft.index}>
      <Card className=" h-100">
        <Card.Header>
          <Stack direction="horizontal" gap={2}>
            <Badge bg="secondary" className="ms-auto">
              {nft.index} ID
            </Badge>
          </Stack>
        </Card.Header>

        <div className=" ratio ratio-4x3">
          <img src={nft.ipfsImage} alt={"CeloAvatar"} style={{ objectFit: "cover" }} />
        </div>

        <Card.Body className="d-flex  flex-column text-center">
          <Card.Text className="flex-grow-1">"CeloAvatar "{nft.index}</Card.Text>
          <div>
            <Row className="mt-2">
              {nft.attributes.map((attribute, key) => (
                <Col key={key}>
                  <div className="border rounded bg-light">
                    <div className="text-secondary fw-lighter small text-capitalize">
                      {attribute.key}
                    </div>
                    <div className="text-secondary text-capitalize font-monospace">
                      {attribute.value}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default UserNftCard;