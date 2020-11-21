import React, { useEffect, useState, useContext } from "react";
import { Paper, withStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, 
            IconButton, TextField } from '@material-ui/core';
import Pagination from './Pagination'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from "react-router-dom";
import ConfirmDelete from './ConfirmDelete'
import { UserContext } from "../context/UserContext";

const styles = theme => ({
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(1),
        paddingBottom: theme.spacing(0)
    },
    row: {
        '& > *': {
          borderBottom: 'unset',
          height: 'unset'
        },
    }
})

const DataTable = ({ classes, ...props }) => {
    const { users, meta, fetchUsers, deleteUser} = useContext(UserContext)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
	let [ name, setName ] = useState("")
    
    useEffect(() => {
        fetchUsers(1, rowsPerPage)
    }, [])

    const handleChangePage = async (event, newPage) => {
        await setPage(newPage);
        fetchUsers(newPage + 1, rowsPerPage)
    };

    const handleChangeRowsPerPage = async (event) => {
        if (event.target.value){
            const val = parseInt(event.target.value, 10)
            await setRowsPerPage(val);
            await setPage(0);
            fetchUsers(1, val)
        }
    };

	const searchChange = async (event) => {
		const { value } = event.target
		name = value
		await setName(value)
		fetchUsers(1, rowsPerPage,  value, value)
    }
    
    const refresh = async () => {
        await setPage(0);
        fetchUsers(1, rowsPerPage)
    }

    return (
        <TableContainer component={Paper} className={classes.paper} >
            <div className="table-header" >
                <div className="table-filter" >
                    <TextField
                        name="search"
                        variant="outlined"
                        label="Search"
                        value={name}
                        onChange={searchChange}
                        autoComplete="off"
                    />
                </div>
            </div>

            <Table aria-label="table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{fontWeight:'600'}}>Name</TableCell>
                        <TableCell style={{fontWeight:'600'}}>Email</TableCell>
                        <TableCell align="right" width="250"> 
                            <div className="cell-add">
                                <Link to="/admin/usercontext/add">
                                    <IconButton color="primary">
                                        <AddCircleIcon />
                                    </IconButton>
                                </Link>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody  style={{ height: "150px", overflow: "auto" }} >
                    {users && users.map((row, index) => (
                        <TableRow className={classes.row} key={index}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.email}
                            </TableCell>
                            <TableCell align="right" width="250">
                                <div className="cell-button">
                                <Link to={`/admin/usercontext/edit/${row.id}`}>
                                    <IconButton color="primary">
                                        <EditIcon />
                                    </IconButton>
                                </Link>
                                <ConfirmDelete
                                    title="Delete Confirmation"
                                    message="Are you sure want to delete this record?"
                                    id={row.id}
                                    deleteUser={deleteUser} 
                                    refresh={refresh}
                                />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}    
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <Pagination 
                            handleChangePage={handleChangePage} 
                            handleChangeRowsPerPage={handleChangeRowsPerPage} 
                            count={meta.totalDocs || 0}
                            page={page}
                            rowsPerPage={rowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>

        </TableContainer>
    );
}

export default (withStyles(styles)(DataTable));
