import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../redux/reducers/actions";
import { BsFillPlusCircleFill, BsFillTrashFill } from "react-icons/bs";

const Job = ({ data }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);

  const isFavorite = favorites.some(job => job._id === data._id);

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(data));
  };

  const handleRemoveFromFavorites = () => {
    dispatch(removeFromFavorites(data));
  };

  return (
    <Row className="mx-0 mt-3 p-3" style={{ border: '1px solid #00000033', borderRadius: 4 }}>
      <Col xs={3}>
        <Link to={`/${data.company_name}`}>{data.company_name}</Link>
      </Col>
      <Col xs={9}>
        <a href={data.url} target="_blank" rel="noreferrer">
          {data.title}
        </a>
        {isFavorite ? (
          <BsFillTrashFill onClick={handleRemoveFromFavorites}>Remove from Favorites</BsFillTrashFill>
        ) : (
          <BsFillPlusCircleFill onClick={handleAddToFavorites}>Add to Favorites</BsFillPlusCircleFill>
        )}
      </Col>
    </Row>
  );
};

export default Job;
