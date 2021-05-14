import React, { useEffect, useState } from "react";
import { useParams } from 'react-router';
import api from "../helpers/api";
import Moment from "react-moment";

function Profile() {

    const { id } = useParams();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [pic, setPic] = useState(''); 
    const [memberSince, setMemberSince] = useState('');

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = () => {
        api.get(`/user/profile/${id}`)
        .then((res) => {
            const profile = res.data.data;
            setName(profile.name);
            setEmail(profile.email);
            setBio(profile.bio);
            setPic(profile.pic);
            setMemberSince(profile.createdAt);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <div className="user-profile row">
                <div className="col-md-4 text-center">
                    <img className="user-profile-pic" src={pic} alt="user-profile" />
                </div>
                <div className="col-md-8 user-profile-data">
                    <h1><b>{name}</b></h1>
                    <h5><i>{email}</i></h5>
                    <p>{bio}</p>
                    <p className="member-since">ReaderSpot member since <Moment format="MMM YYYY">{memberSince}</Moment></p>
                </div>
            </div>
            <br />
            <br />
            <h3>{name}'s Articles</h3>
            <hr />
        </div>
    );
}

export default Profile;