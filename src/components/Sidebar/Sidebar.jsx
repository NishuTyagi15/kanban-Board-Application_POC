import React from 'react';
import { connect } from 'react-redux';
import { IconButton, Paper, Typography } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import './Sidebar.css';

const Sidebar = ({ tasks, onTaskClick, openColumns }) => {
    return (
        <div className="sidebar">
            {Object.keys(tasks)
                .filter((status) => !openColumns.includes(status)) // Ensure 'status' is a string here
                .map((status, index) => (
                    <Paper className="sidebar-paper" key={index}>
                        <Typography className="sidebar-status">
                            {status.charAt(0).toUpperCase() + status.slice(1)} {/* Ensure status is a string */}
                        </Typography>
                        <IconButton onClick={() => onTaskClick(status)}>
                            <ArrowForwardIos className="arrow-icon" />
                        </IconButton>
                    </Paper>
                ))}
        </div>
    );
};

const mapStateToProps = (state) => ({
    tasks: state.tasks,
});

export default connect(mapStateToProps)(Sidebar);
