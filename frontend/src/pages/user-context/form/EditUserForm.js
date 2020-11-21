import React, { useState, useEffect, useContext } from 'react'
import { TextField, withStyles, Button, Paper, Grid } from "@material-ui/core";
import { toast } from 'react-toastify';
import PageTitle from "../../../components/PageTitle/PageTitle";
import { UserContext } from "../context/UserContext";
import '../style.css';

const styles = theme => ({
	paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(3)
        },
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
		justifyContent: 'center',
    },
    postBtn: {
        width: "200px",
        marginTop: "30px",
        marginBottom: "20px"
    }
})

const initialFormState = { 
	id: null, 
	name: "",
	email: ""
}

const EditUserForm = ({ classes, ...props }) => {
	const [ user, setUser ] = useState(initialFormState)
	const [ errors, setErrors ] = useState({})
	const { fetchById, updateUser} = useContext(UserContext)

	useEffect(() => {
		const onSuccess = (user) => {
            setUser(user)
		}
		const id = props.match.params.id
		fetchById(id, onSuccess)
	}, [])

	const handleInputChange = event => {
		const { name, value } = event.target
		setUser({ ...user, [name]: value })
	}

	const validate = () => {
        let tempErrors = {};
        let formIsValid = true;

        if(!user.name || user.name.trim() ===  ""){
			formIsValid = false;
			tempErrors["name"] = "Cannot be empty";
		}
	
		if(!user.email || user.email.trim() ===  ""){
			formIsValid = false;
			tempErrors["email"] = "Email not valid";
		}
	
		setErrors(tempErrors);
		return formIsValid;
    }
	
	const handleSubmit = (e) => {
		const onSuccess = () => {
			props.history.push("/admin/usercontext")
			toast.success('Data succesfully updated');
		}
		
        e.preventDefault();

        if(validate()){
			updateUser(user.id, user, onSuccess)
        }
    }

	return (
		<React.Fragment>
            <PageTitle title="Edit User" />
            <Grid container spacing={4} >

				<Paper className={classes.paper}>

				<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
					onSubmit={handleSubmit} component={Paper} >

					<TextField
						name="name"
						variant="outlined"
						label="Name"
						fullWidth
						value={user ? user.name : ''}
						onChange={handleInputChange}
						{...(errors.name && { error: true, helperText: errors.name })}
					/>
					<TextField
						name="email"
						variant="outlined"
						label="Email"
						fullWidth
						value={user ? user.email : ''}
						onChange={handleInputChange}
						{...(errors.email && { error: true, helperText: errors.email })}
					/>

					<div className="form-button-container">
						<Button
							variant="contained"
							color="primary"
							size="large"
							onClick={() => props.history.push("/admin/usercontext")}
						>Cancel</Button>

						<Button
							variant="contained"
							color="secondary"
							size="large"
							type="submit"
						>Save</Button>
					</div>
					
				</form>
				</Paper>
			</Grid>
		</React.Fragment>
    );
}

export default (withStyles(styles)(EditUserForm));
