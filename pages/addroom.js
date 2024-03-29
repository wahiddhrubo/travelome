import Head from "next/head";
import React, { useState, useContext } from "react";
import InputForm from "../components/inputForm.js";
import SubmitButton from "../components/button.js";
import { checkEmptyField } from "../components/formvalidation.js";
import { TravelHomeContext } from "../context/TravelHomeContext.js";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { ADD_ROOM } from "../store/saga/actions.js";
import { getUser } from "../store/selectors.js";

export default function AddRoom() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [img, setImg] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [bed, setBed] = useState("");
  const [bath, setBath] = useState("");
  const [price, setPrice] = useState("");
  const [maxNumOfPeople, setMaxNumOfPeople] = useState("");
  const [placeType, setPlaceType] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [features, setFeatures] = useState([]);
  const [errors, SetErrors] = useState([]);
  const [checked, SetChecked] = useState(false);

  const { account } = useSelector(getUser);

  const router = useRouter();

  const formData = [
    { name: name },
    { description: description },
    { city: city },
    { location: location },
    { img: img },
    { latitude: latitude },
    { longitude: longitude },
    { bed: bed },
    { bath: bath },
    { price: price },
    { maxNumOfPeople: maxNumOfPeople },
    { placeType: placeType },
    { propertyType: propertyType },
    { features: features },
  ];

  const check = () => {
    if (!checkEmptyField(formData)) {
      dispatch({
        type: ADD_ROOM,
        name,
        description,
        city,
        location,
        img,
        latitude,
        longitude,
        bed,
        bath,
        price,
        maxNumOfPeople,
        placeType,
        propertyType,
        features,
      });
      router.push(`/user/${account}`);
    } else {
      const emptyFields = checkEmptyField(formData);
      SetErrors(emptyFields);
    }
  };

  return (
    <div>
      <Head>
        <title>Add Room</title>
        <meta name="description" content="Add A New Room" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="text-center text-2xl font-semibold m-5">
        Add A New Room
      </div>
      <div className="text-center text-lg text-em font-normal text-[#f12711]">
        Remember You Can&apos;t Change The Room Details Later!!!
      </div>
      <InputForm
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        city={city}
        setCity={setCity}
        location={location}
        setLocation={setLocation}
        img={img}
        setImg={setImg}
        latitude={latitude}
        setLatitude={setLatitude}
        longitude={longitude}
        setLongitude={setLongitude}
        bed={bed}
        setBed={setBed}
        bath={bath}
        setBath={setBath}
        price={price}
        setPrice={setPrice}
        maxNumOfPeople={maxNumOfPeople}
        setMaxNumOfPeople={setMaxNumOfPeople}
        placeType={placeType}
        setPlaceType={setPlaceType}
        features={features}
        setFeatures={setFeatures}
        checked={checked}
        SetChecked={SetChecked}
        propertyType={propertyType}
        setPropertyType={setPropertyType}
        errors={errors}
      />
      <div className="text-right px-10">
        <SubmitButton
          className="margin-xl-auto"
          onClick={check}
          type="SubmitButton"
          buttonType="submit"
          text="Submit"
        />
      </div>
    </div>
  );
}
