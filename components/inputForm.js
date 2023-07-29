import { alpha, styled } from "@mui/material/styles";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import FeatureForm from "./featureform.js";
import ImageUpload from "./imageupload.js";

export default function InputForm({
  name,
  setName,
  description,
  setDescription,
  city,
  setCity,
  location,
  setLocation,
  img,
  setImg,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  bed,
  setBed,
  bath,
  setBath,
  price,
  setPrice,
  maxNumOfPeople,
  setMaxNumOfPeople,
  title,
  setTitle,
  placeType,
  setPlaceType,
  features,
  setFeatures,
  propertyType,
  setPropertyType,
  errors,
}) {
  const styles = {
    wrapper: `flex flex-wrap  `,
    inputDiv: `w-1/2 p-10`,
    inputDivFull: `w-full p-10`,
    inputselect: `w-full text-black `,
    error: " border-b-2 !border-[#d32f2f]",
    input: ` border-black w-full text-black px-3 py-3 placeholder-opacity-100 placeholder:capitalize placeholder:text-black  rounded-[8px]  border-b-2`,
  };

  const CustomSelect = styled(Select)({
    "&:after": {
      borderBottomColor: "green",
    },
    "&:before": {
      borderBottomColor: "black",
      borderWidth: "0px",
      borderBottomWidth: "2px",
      borderRadius: "6px",
    },
  });

  const fields = [
    {
      inputType: "text",
      inputId: name,
      id: "name",
      changeHandler: (e) => setName(e.target.value),
      label: "name",
      multiline: false,
      fullwidth: true,
    },

    {
      inputType: "select",
      inputId: propertyType,
      id: "propertyType",
      changeHandler: (e) => setPropertyType(e.target.value),
      label: "Property Type",
      multiline: false,
      options: ["House", "Apartment", "Guesthouse", "Hotel"],
    },

    {
      inputType: "select",
      inputId: placeType,
      id: "placeType",
      changeHandler: (e) => setPlaceType(e.target.value),
      label: "Place Type",
      multiline: false,
      options: ["Entire place", "Private room", "Shared room"],
    },

    {
      inputType: "text",
      inputId: description,
      id: "description",
      changeHandler: (e) => setDescription(e.target.value),
      label: "description",
      multiline: true,
      fullwidth: true,
    },

    {
      inputType: "select",
      inputId: city,
      id: "city",
      changeHandler: (e) => setCity(e.target.value),
      label: "Country",
      multiline: false,
      options: [
        "United States",
        "United Kingdom",
        "Canada",
        "Southern Asia",
        "Europe",
      ],
    },

    {
      inputType: "text",
      inputId: location,
      id: "location",
      changeHandler: (e) => setLocation(e.target.value),
      label: "location",
      multiline: false,
    },

    {
      inputType: "text",
      inputId: latitude,
      id: "latitude",
      changeHandler: (e) => setLatitude(e.target.value),
      label: "latitude",
      multiline: false,
    },

    {
      inputType: "text",
      inputId: longitude,
      id: "longitude",
      changeHandler: (e) => setLongitude(e.target.value),
      label: "longitude",
      multiline: false,
    },

    {
      inputType: "number",
      inputId: bath,
      id: "bath",
      changeHandler: (e) => setBath(e.target.value),
      label: "bath",
      multiline: false,
    },

    {
      inputType: "number",
      inputId: bed,
      id: "bed",
      changeHandler: (e) => setBed(e.target.value),
      label: "bed",
      multiline: false,
    },

    {
      inputType: "number",
      inputId: price,
      id: "price",
      changeHandler: (e) => setPrice(e.target.value),
      label: "price",
      multiline: false,
    },

    {
      inputType: "number",
      inputId: maxNumOfPeople,
      id: "maxNumOfPeople",
      changeHandler: (e) => setMaxNumOfPeople(e.target.value),
      label: "maxNumOfPeople",
      multiline: false,
    },
  ];

  const featuresList = [
    "Wifi",
    "Air Conditioner",
    "TV",
    "Breakfast",
    "BBQ & Grill",
    "Kitchen",
    "Car Parking",
    "Pets",
    "Long Term Stay",
    "Fireplace",
  ];

  const helpertext = (f) => {
    errors.includes(f.id) ? "Please Fill This Field" : "Required";
  };

  return (
    <div className={styles.wrapper}>
      {fields.map((f) =>
        f.inputType == "text" || f.inputType == "number" ? (
          <div
            key={f.id}
            className={f.fullwidth ? styles.inputDivFull : styles.inputDiv}
          >
            <textarea
              className={
                errors.includes(f.id)
                  ? styles.error + styles.input
                  : styles.input
              }
              type={f.inputType}
              required
              placeholder={f.label}
              rows={f.multiline ? 4 : 1}
              value={f.inputId}
              onChange={f.changeHandler}
            />
            <FormHelperText error={errors.includes(f.id) ? true : false}>
              {errors.includes(f.id) && "Please Fill This Field"}
              {!errors.includes(f.id) && "Required"}
            </FormHelperText>
          </div>
        ) : (
          <div key={f.id} className={styles.inputDiv}>
            <FormControl variant="standard" className={styles.inputselect}>
              <InputLabel
                id={f.inputId}
                sx={{
                  color: "black",
                  textTransform: "capitalize",
                }}
              >
                {f.label}
              </InputLabel>
              <CustomSelect
                id={f.inputId}
                value={f.inputId}
                onChange={f.changeHandler}
                label={f.label}
                error={errors.includes(f.id) ? true : false}
                helpertext={
                  errors.includes(f.id) ? "Please Fill This Field" : "Required"
                }
              >
                {f.options.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </CustomSelect>
              <FormHelperText error={errors.includes(f.id) ? true : false}>
                {errors.includes(f.id) && "Please Fill This Field"}
                {!errors.includes(f.id) && "Required"}
              </FormHelperText>
            </FormControl>
          </div>
        )
      )}

      <FeatureForm
        setFeatures={setFeatures}
        features={features}
        styles={styles}
        CustomSelect={CustomSelect}
        errors={errors}
        selections={featuresList}
        title="Features"
      />
      <ImageUpload img={img} setImg={setImg} errors={errors} />
    </div>
  );
}
