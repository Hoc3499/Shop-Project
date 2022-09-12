import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import styled from "styled-components";

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RatingTitle = styled.span`
  font-weight: 400;
  font-size: 28px;
  margin-right: 10px;
`;

const RatingIcon = styled.span`
  color: #f8e825;
`;

const RatingText = styled.span`
  margin-left: 10px;
  font-size: 18px;
`;

const Rating = ({ value, text }) => {
  return (
    <RatingContainer>
      <RatingTitle>Rating:</RatingTitle>
      <RatingIcon>
        {value >= 1 ? (
          <StarIcon />
        ) : value >= 0.5 ? (
          <StarHalfIcon />
        ) : (
          <StarBorderIcon />
        )}
      </RatingIcon>
      <RatingIcon>
        {value >= 2 ? (
          <StarIcon />
        ) : value >= 1.5 ? (
          <StarHalfIcon />
        ) : (
          <StarBorderIcon />
        )}
      </RatingIcon>
      <RatingIcon>
        {value >= 3 ? (
          <StarIcon />
        ) : value >= 2.5 ? (
          <StarHalfIcon />
        ) : (
          <StarBorderIcon />
        )}
      </RatingIcon>
      <RatingIcon>
        {value >= 4 ? (
          <StarIcon />
        ) : value >= 3.5 ? (
          <StarHalfIcon />
        ) : (
          <StarBorderIcon />
        )}
      </RatingIcon>
      <RatingIcon>
        {value >= 5 ? (
          <StarIcon />
        ) : value >= 4.5 ? (
          <StarHalfIcon />
        ) : (
          <StarBorderIcon />
        )}
      </RatingIcon>
      <RatingText>{text && text}</RatingText>
    </RatingContainer>
  );
};

export default Rating;
