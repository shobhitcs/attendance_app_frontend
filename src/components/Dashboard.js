import React, { useState } from 'react';
import '../styles/componentStyle.css';
import { Tabs, Tab, Typography, SpeedDial, SpeedDialIcon, SpeedDialAction, ListItemText, Divider, ListItem, List } from '@mui/material';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import SpeedDial from '@mui/material/SpeedDial';
// import SpeedDialIcon from '@mui/material/SpeedDialIcon';
// import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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

    const dataenroll = [
        { name: 'CS102', description: 'Sofware Labs' },
        { name: 'CS210', description: 'Digital Circuits and Labs' },
        { name: 'CS222', description: 'Algorithm Design' }]
    const datacreate = [
        { name: 'CS103', description: 'Sofware Labs' },
        { name: 'CS216', description: 'Digital Circuits and Labs' },
        { name: 'CS224', description: 'Algorithm Design' }]
    return (
        <div className="dash">
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                style={{ width: '950px' }}
                TabIndicatorProps={{
                    style: {
                        backgroundColor: '#007bff'
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
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {dataenroll.map((item, index) => (<div className='tile' key={index}>
                            {index !== 0 && <Divider variant="offset" component="li" />}
                            <ListItem alignItems="flex-start" >

                                <ListItemText
                                    primary={item.name}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >

                                            </Typography>
                                            {item.description}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        </div>
                        ))}
                    </List>
                </div>
            )}
            {selectedTab === 1 && (
                <div className='tab-det'>
                {/* Content for Tab 1 */}
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {datacreate.map((item, index) => (<div className='tile' key={index}>
                        {index !== 0 && <Divider variant="offset" component="li" />}
                        <ListItem alignItems="flex-start" >

                            <ListItemText
                                primary={item.name}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >

                                        </Typography>
                                        {item.description}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </div>
                    ))}
                </List>
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
