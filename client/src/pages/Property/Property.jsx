import React from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { getProperty } from '../../utils/api';
import { PuffLoader } from 'react-spinners';
import { AiFillStar } from 'react-icons/ai';

const Property = () => {
    const { pathname } = useLocation();
    const id = pathname.split("/").slice(-1)[0];

    const { data, isLoading, isError } = useQuery(["resd", id], () => getProperty(id));

    if (isLoading) {
        return (
            <div className="wrapper">
                <div className="flexCenter paddings">
                    <PuffLoader />
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="wrapper">
                <div className="flexCenter paddings">
                    <span>Error While Fetching The Land Details</span>
                </div>
            </div>
        );
    }

    return (
        <div className="wrapper">
            <div className="flexColStart paddings innerWidth property-container">
                <div className="like">
                    <AiFillStar size={24} color="#ffB000" />
                </div>
                <img src={data.image} alt="home image" />
            </div>
        </div>
    );
};

export default Property;
