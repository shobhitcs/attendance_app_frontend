import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import '../styles/componentStyle.css';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Dashboard = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };
    const [open, setOpen] = useState(false);

    const handleSpeedDialOpen = () => {
        setOpen(true);
    };

    const handleSpeedDialClose = () => {
        setOpen(false);
    };
    const actions = [
        { icon: <AddIcon />, name: 'Add' },
        { icon: <EditIcon />, name: 'Edit' },
        { icon: <DeleteIcon />, name: 'Delete' },
    ];

    return (
        <div className="dash">
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                TabIndicatorProps={{
                    style: {
                        backgroundColor: '#007bff' // Highlight color for active tab
                    },
                }}
                sx={{ marginBottom: '20px' }}
            >
                <Tab label="Enrolled" />
                <Tab label="Created" />
            </Tabs>
            {selectedTab === 0 && (
                <div className='tab-det'>
                    {/* Content for Tab 1 */}
                    <Stack spacing={2} direction="column">
                        <div className="tile">
                            hello
                        </div>
                    </Stack>
                </div>
            )}
            {selectedTab === 1 && (
                <div className='tab-det'>
                    {/* Content for Tab 2 */}
                    <Typography>
                        This is the content for Created tab.
                    </Typography>
                </div>
            )}
            <div className="speed-dial">
                <SpeedDial
                    ariaLabel="SpeedDial example"
                    icon={<SpeedDialIcon />}
                    onClose={handleSpeedDialClose}
                    onOpen={handleSpeedDialOpen}
                    open={open}
                    direction="up" // Change direction as needed
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={handleSpeedDialClose}
                        />
                    ))}
                </SpeedDial>
            </div>
        </div>
    );
};

export default Dashboard;
