"use client"

import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import styles from './page.module.css';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { DatePicker } from '@mui/x-date-pickers';
import { motion, AnimatePresence } from 'framer-motion'
import { PickersDay } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import Snackbar from '@mui/material/Snackbar';

export default function Home() {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = React.useState(false);
    const [excluderOpen, setExcluderOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [selectedDates, setSelectedDates] = React.useState([]);
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [noDays, setNoDays] = React.useState(0);
    const [ddrVal, setDdrVal] = React.useState(0);
    const [leadCount, setLeadCount] = React.useState(0);
    const [dateError, setDateError] = React.useState(null);
    const [dayError, setDayError] = React.useState(null);
    const [countError, setCountError] = React.useState(null);
    const [openNotify, setOpenNotify] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'startDate', headerName: 'Start Date', width: 130 },
        { field: 'endDate', headerName: 'End Date', width: 130 },
        { field: 'monthYear', headerName: 'Month,Year', width: 200 },
        { field: 'excludedDates', headerName: 'Dates Excluded', flex: 1 },
        { field: 'noOfDays', headerName: 'N.o of Days', width: 130 },
        { field: 'leadCount', headerName: 'Lead Count', width: 130 },
        { field: 'expectedDDR', headerName: 'Expected DDR', width: 130 }
    ];

    const [rows, setRows] = React.useState([
        { id: 1, startDate: '2023-01-01', endDate: '2023-01-31', monthYear: 'January, 2023', excludedDates: '2023-01-15, 2023-01-20', noOfDays: 31, leadCount: 150, expectedDDR: 5.0 },
        { id: 2, startDate: '2023-02-01', endDate: '2023-02-28', monthYear: 'February, 2023', excludedDates: '2023-02-14', noOfDays: 28, leadCount: 140, expectedDDR: 5.0 },
        { id: 3, startDate: '2023-03-01', endDate: '2023-03-31', monthYear: 'March, 2023', excludedDates: '2023-03-10, 2023-03-25', noOfDays: 31, leadCount: 160, expectedDDR: 5.2 },
        { id: 4, startDate: '2023-04-01', endDate: '2023-04-30', monthYear: 'April, 2023', excludedDates: '', noOfDays: 30, leadCount: 155, expectedDDR: 5.2 },
        { id: 5, startDate: '2023-05-01', endDate: '2023-05-31', monthYear: 'May, 2023', excludedDates: '2023-05-10, 2023-05-20', noOfDays: 31, leadCount: 165, expectedDDR: 5.3 },
        { id: 6, startDate: '2023-06-01', endDate: '2023-06-30', monthYear: 'June, 2023', excludedDates: '2023-06-15', noOfDays: 30, leadCount: 160, expectedDDR: 5.3 },
        { id: 7, startDate: '2023-07-01', endDate: '2023-07-31', monthYear: 'July, 2023', excludedDates: '2023-07-05, 2023-07-25', noOfDays: 31, leadCount: 170, expectedDDR: 5.5 },
        { id: 8, startDate: '2023-08-01', endDate: '2023-08-31', monthYear: 'August, 2023', excludedDates: '2023-08-15', noOfDays: 31, leadCount: 175, expectedDDR: 5.6 },
        { id: 9, startDate: '2023-09-01', endDate: '2023-09-30', monthYear: 'September, 2023', excludedDates: '', noOfDays: 30, leadCount: 170, expectedDDR: 5.7 },
        { id: 10, startDate: '2023-10-01', endDate: '2023-10-31', monthYear: 'October, 2023', excludedDates: '2023-10-10, 2023-10-20', noOfDays: 31, leadCount: 180, expectedDDR: 5.8 },
    ]);

    let updatedRows = rows.map((row) => ({
        ...row,
        excludedDates: row.excludedDates || 'None',
    }));

    const handleExcludeDateChange = (date) => {
        setSelectedDates([...selectedDates, date]);
        console.log(noDays + "-" + selectedDates.length);
        setSelectedDate(null);
    }

    const handleRemoveDateChip = (index) => {
        const updatedDates = [...selectedDates];
        updatedDates.splice(index, 1);
        setSelectedDates(updatedDates);
    }

    function isSameDay(date1, date2) {
        return (
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    }

    const ServerDay = (props) => {

        const { selected, day, ...rest } = props;
        let highlight = false;
        selectedDates.forEach((date) => {

            if (isSameDay(new Date(date), new Date(props.day.$d))) {
                highlight = true;
            }
        });

        return (
            <PickersDay selected={highlight} day={day} {...rest}></PickersDay>
        );
    };

    const calculateNextId = () => {
        const maxId = Math.max(...rows.map(row => row.id), 0);
        return maxId + 1;
    };

    function formatDateToYYYYMMDD(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const handleSubmit = () => {
        // Initialize error variables
        let dateError = null;
        let dayError = null;
        let countError = null;

        if (startDate == null || endDate == null) {
            dateError = "Please check your start date and end date";
        } else {
            dateError = null;
        }

        if (noDays - selectedDates.length <= 0) {
            dayError = "Please select at least one day to submit the form";
        } else {
            dayError = null;
        }

        if (leadCount == 0 || leadCount === '') {
            countError = "Please enter a lead count greater than 1";
        } else {
            countError = null;
        }

        // Check if all errors are empty
        if (dateError === null && dayError === null && countError === null) {
            const nextId = calculateNextId();
            console.log(selectedDates);
            const newDataRow = {
                id: nextId,
                startDate: formatDateToYYYYMMDD(new Date(startDate)),
                endDate: formatDateToYYYYMMDD(new Date(endDate)),
                monthYear: new Date(startDate).getMonth() + "-" + new Date(startDate).getFullYear() + "," + new Date(endDate).getMonth() + "-" + new Date(endDate).getFullYear(),
                excludedDates: selectedDates.map(date => date.toISOString().slice(0, 10)).join(', '),
                noOfDays: (noDays - selectedDates.length),
                leadCount: leadCount,
                expectedDDR: ddrVal
            };
            setRows([...rows, newDataRow]);
            setOpen(false);
            setOpenNotify(true);
        }

        // Update the state with the error variables
        setDateError(dateError);
        setDayError(dayError);
        setCountError(countError);
    }

    const setActiveError = () => {
        if (dateError != null) {
            return dateError;
        }
        if (dayError != null) {
            return dayError;
        }
        if (countError != null) {
            return countError;
        }
        return null; // No active error
    };



    const activeError = setActiveError();

    React.useEffect(() => {
        if ((noDays - selectedDates.length) > 0) {
            const ddrVal = (leadCount / (noDays - selectedDates.length)).toFixed(2);
            console.log(leadCount + "-" + noDays - selectedDates.lengt)
            setDdrVal(ddrVal);
        }
        else {
            setDdrVal(0);
        }
    });

    return (
        <section className={styles['flex-wrap']}>
            <Button variant="contained"
                startIcon={<AddIcon />}
                style={{
                    textTransform: 'none',
                    boxShadow: 'none',
                    backgroundColor: '#3772FF',
                    borderRadius: '100px',
                    fontFamily: 'var(--poppins)',
                    fontWeight: 400,
                    marginLeft: 'auto',
                    fontSize: '14px',
                    padding: '8px 24px'
                }}
                onClick={handleClickOpen}>
                Add New
            </Button>


            <div className={styles['table-wrap']}>
                <DataGrid rows={updatedRows} columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 20 },
                        },
                    }}
                    style={{
                        borderRadius: '20px',
                        fontFamily: 'var(--poppins)',
                        fontWeight: 400,
                        fontSize: '14px',
                    }}
                    classes={{ cell: styles['no-outline-cell'] }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection />
            </div>

            <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
                <DialogTitle id="responsive-dialog-title">
                    {"Add New Daily Run Rate"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Kindly submit the necessary information to set a daily run rate, optimizing our operational efficiency and performance analysis.
                    </DialogContentText>
                    <Collapse in={activeError != null}>
                        {activeError && (
                            <Alert severity="error" style={{ marginTop: '20px' }}>
                                {activeError}
                            </Alert>
                        )}
                    </Collapse>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack direction="column" spacing={3}>

                            <DateRangePicker
                                error={true}
                                startDate={startDate} endDate={endDate} onAccept={(date) => {
                                    setStartDate(date[0]);
                                    setEndDate(date[1]);

                                    if (date[0] && date[1]) {
                                        const date1 = new Date(date[0].$d);
                                        const date2 = new Date(date[1].$d);
                                        console.log(date1);
                                        const timeDifference = date2 - date1;
                                        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
                                        setNoDays(daysDifference + 1);
                                    }
                                }} localeText={{ start: 'Start Date', end: 'End Date' }} className={styles['date-picker']} />

                            <Chip style={{
                                fontFamily: 'var(--poppins)',
                                marginRight: 'auto',
                                fontWeight: 500,
                                backgroundColor: excluderOpen ? '#3772FF' : '#fff',
                                color: excluderOpen ? '#fff' : '#3772FF',
                                border: excluderOpen ? '1px solid transparent' : '1px solid #3772FF'
                            }} label="Exclude Dates"
                                onClick={() => setExcluderOpen(!excluderOpen)}
                                disabled={!startDate || !endDate} />

                            <AnimatePresence>
                                {excluderOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Stack direction="column" spacing={2} style={{ width: '100%' }}>
                                            <DatePicker minDate={startDate} disabled={selectedDate}
                                                slots={{
                                                    day: ServerDay,
                                                }}
                                                maxDate={endDate} className={styles['datepicker']} value={selectedDate} style={{ width: '100%' }} label={"Choose Dates to exclude"} onAccept={handleExcludeDateChange}></DatePicker>
                                            <div className={styles['chip-wrap']}>
                                                {selectedDates.map((date, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={new Date(date).getDate() + "-" + new Date(date).getMonth() + "-" + new Date(date).getFullYear()} // You can format the date as needed
                                                        onDelete={() => handleRemoveDateChip(index)}
                                                    />
                                                ))}
                                            </div>
                                        </Stack>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <TextField label="Number of Days" value={(noDays - selectedDates.length)} InputLabelProps={{ shrink: 1 }} onChange={(e) => {
                                if (e.target.value == 0) {
                                    setDdrVal(0);
                                    setLeadCount(0);
                                }
                            }}></TextField>
                            <Stack direction="row" spacing={2} style={{ width: '100%' }}>
                                <TextField label="Lead Count" style={{ width: '100%' }} onInput={(e) => {
                                    const inputValue = e.target.value;
                                    setLeadCount(inputValue);

                                }}></TextField>
                                <TextField label="Expected DDR" value={ddrVal} style={{ width: '100%' }}></TextField>
                            </Stack>
                        </Stack>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSubmit}>Submit</Button>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={openNotify}
                autoHideDuration={3000}
                message="Data Added to the table"
            />
        </section>
    )
}
