import React, { useEffect, useState } from "react";
import { useParams } from 'react-router';
import api from "../helpers/api";
import Moment from "react-moment";
import ArticleList from "./ArticleList";

function Profile() {

    const { id } = useParams();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [pic, setPic] = useState(''); 
    const [memberSince, setMemberSince] = useState('');

    const [articles, setArticles] = useState('');

    useEffect(() => {
        getProfile();
        getUserArticles();
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

    const getUserArticles = async () => {
        const res = await api.get(`/user/published-articles/${id}`);
        console.log(res.data)
        if (res.data.status === 1 && res.data.data)
            setArticles(res.data.data.articles);
    };

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
            {
                articles ? 
                <div>
                    <ArticleList articles={articles} /> 
                </div>
                : 
                <h2>This user has not published any article</h2>
            }
        </div>
    );
}

export default Profile;