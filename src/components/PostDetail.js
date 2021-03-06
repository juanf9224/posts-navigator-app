/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles, createStyles } from '@material-ui/core';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";

import { editDialog } from '../actions/edit-dialog';
import postVisual from "../assets/svg/post-visual-flowers.svg";

const useStyles = makeStyles(() => createStyles({
  card: {
    position: "relative",
    height: "100%",
  },
  card__media: {
    height: "80px",
  },
  card__title: {
    fontWeight: "bold",
    minHeight: '50px'
  }
}));

export const PostDetail = ({ id, title, body, openEditDialog }) => {
  const [gridSize, setGridSize] = useState(5);
  const matches = useMediaQuery("(max-width: 500px)");
  const classes = useStyles();

  useEffect(() => {
    // sets the grid size based on viwewport width
    if (matches) {
      setGridSize(12);
    } else {
      setGridSize(5);
    }
  }, [matches]);

  return (
    <Grid item xs={gridSize} data-testid="post-detail">
      <Card className={classes.card}>
        <CardMedia
          component="img"
          className={classes.card__media}
          src={postVisual}
          title="leafs pattern"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.card__title}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            component="p"
          >
            {body}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            color="primary"
            aria-label="Edit post"
            onClick={() => openEditDialog({ id, title, body })}
            data-testid="edit-post-btn"
          >
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch, props) => ({
  openEditDialog: (post) => dispatch(editDialog(post)),
});

export default connect(undefined, mapDispatchToProps)(PostDetail);
