// @flow

import React from "react";
import { AddressType } from "../../../types";
import { List } from "immutable";

type Props = {
  id: string,
  value: AddressType,
  content: string,
  placeholder: string,
  onChange: Function
};

// Found at https://gist.github.com/mshafrir/2646763
const states = [
  {
    name: "Alabama",
    abbreviation: "AL"
  },
  {
    name: "Alaska",
    abbreviation: "AK"
  },
  {
    name: "American Samoa",
    abbreviation: "AS"
  },
  {
    name: "Arizona",
    abbreviation: "AZ"
  },
  {
    name: "Arkansas",
    abbreviation: "AR"
  },
  {
    name: "California",
    abbreviation: "CA"
  },
  {
    name: "Colorado",
    abbreviation: "CO"
  },
  {
    name: "Connecticut",
    abbreviation: "CT"
  },
  {
    name: "Delaware",
    abbreviation: "DE"
  },
  {
    name: "District Of Columbia",
    abbreviation: "DC"
  },
  {
    name: "Federated States Of Micronesia",
    abbreviation: "FM"
  },
  {
    name: "Florida",
    abbreviation: "FL"
  },
  {
    name: "Georgia",
    abbreviation: "GA"
  },
  {
    name: "Guam",
    abbreviation: "GU"
  },
  {
    name: "Hawaii",
    abbreviation: "HI"
  },
  {
    name: "Idaho",
    abbreviation: "ID"
  },
  {
    name: "Illinois",
    abbreviation: "IL"
  },
  {
    name: "Indiana",
    abbreviation: "IN"
  },
  {
    name: "Iowa",
    abbreviation: "IA"
  },
  {
    name: "Kansas",
    abbreviation: "KS"
  },
  {
    name: "Kentucky",
    abbreviation: "KY"
  },
  {
    name: "Louisiana",
    abbreviation: "LA"
  },
  {
    name: "Maine",
    abbreviation: "ME"
  },
  {
    name: "Marshall Islands",
    abbreviation: "MH"
  },
  {
    name: "Maryland",
    abbreviation: "MD"
  },
  {
    name: "Massachusetts",
    abbreviation: "MA"
  },
  {
    name: "Michigan",
    abbreviation: "MI"
  },
  {
    name: "Minnesota",
    abbreviation: "MN"
  },
  {
    name: "Mississippi",
    abbreviation: "MS"
  },
  {
    name: "Missouri",
    abbreviation: "MO"
  },
  {
    name: "Montana",
    abbreviation: "MT"
  },
  {
    name: "Nebraska",
    abbreviation: "NE"
  },
  {
    name: "Nevada",
    abbreviation: "NV"
  },
  {
    name: "New Hampshire",
    abbreviation: "NH"
  },
  {
    name: "New Jersey",
    abbreviation: "NJ"
  },
  {
    name: "New Mexico",
    abbreviation: "NM"
  },
  {
    name: "New York",
    abbreviation: "NY"
  },
  {
    name: "North Carolina",
    abbreviation: "NC"
  },
  {
    name: "North Dakota",
    abbreviation: "ND"
  },
  {
    name: "Northern Mariana Islands",
    abbreviation: "MP"
  },
  {
    name: "Ohio",
    abbreviation: "OH"
  },
  {
    name: "Oklahoma",
    abbreviation: "OK"
  },
  {
    name: "Oregon",
    abbreviation: "OR"
  },
  {
    name: "Palau",
    abbreviation: "PW"
  },
  {
    name: "Pennsylvania",
    abbreviation: "PA"
  },
  {
    name: "Puerto Rico",
    abbreviation: "PR"
  },
  {
    name: "Rhode Island",
    abbreviation: "RI"
  },
  {
    name: "South Carolina",
    abbreviation: "SC"
  },
  {
    name: "South Dakota",
    abbreviation: "SD"
  },
  {
    name: "Tennessee",
    abbreviation: "TN"
  },
  {
    name: "Texas",
    abbreviation: "TX"
  },
  {
    name: "Utah",
    abbreviation: "UT"
  },
  {
    name: "Vermont",
    abbreviation: "VT"
  },
  {
    name: "Virgin Islands",
    abbreviation: "VI"
  },
  {
    name: "Virginia",
    abbreviation: "VA"
  },
  {
    name: "Washington",
    abbreviation: "WA"
  },
  {
    name: "West Virginia",
    abbreviation: "WV"
  },
  {
    name: "Wisconsin",
    abbreviation: "WI"
  },
  {
    name: "Wyoming",
    abbreviation: "WY"
  }
];

export default function Address(props: Props) {
  const { id, value, onChange, placeholder, content } = props;

  const changeStreet = street => {
    onChange(value.set("street", street));
  };
  const changeCity = city => {
    onChange(value.set("city", city));
  };
  const changeState = state => {
    onChange(value.set("state", state));
  };
  const changeCountry = country => {
    onChange(value.set("country", country));
  };
  const changeZip = zip => {
    onChange(value.set("zip", zip));
  };

  return (
    <div className="question-widget question-address pure-g">
      <p className="content pure-u-1">{content}</p>
      <div className="pure-u-1">
        <label htmlFor={id + "-street"}>Street Address</label>
        <input
          id={id + "-street"}
          name={id + "-street"}
          type="text"
          placeholder={placeholder}
          value={value.street}
          className="pure-u-1"
          onChange={e => {
            changeStreet(e.target.value);
          }}
        />
      </div>
      <div className="pure-u-1-4">
        <label htmlFor={id + "-city"}>City:</label>
        <input
          id={id + "-city"}
          name={id + "-city"}
          type="text"
          placeholder="City"
          value={value.city}
          className="pure-u-23-24"
          onChange={e => {
            changeCity(e.target.value);
          }}
        />
      </div>
      <div className="pure-u-1-4">
        <label htmlFor={id + "-state"}>State:</label>
        <select
          id={id + "-state"}
          name={id + "-state"}
          placeholder={placeholder}
          value={value.state}
          className="pure-u-23-24"
          onChange={e => {
            changeState(e.target.value);
          }}
        >
          {List(states)
            .map((state, i) => (
              <option key={i} value={state.name}>{state.abbreviation}</option>
            ))
            .toJS()}
        </select>
      </div>
      <div className="pure-u-1-4">
        <label htmlFor={id + "-state"}>Country:</label>
        <input
          id={id + "-country"}
          name={id + "-country"}
          type="text"
          placeholder="Country"
          value={value.country}
          className="pure-u-23-24"
          onChange={e => {
            changeCountry(e.target.value);
          }}
        />
      </div>
      <div className="pure-u-1-4">
        <label htmlFor={id + "-state"}>Zip:</label>
        <input
          id={id + "-zip"}
          name={id + "-zip"}
          type="text"
          placeholder="Your Zip code"
          value={value.zip}
          className="pure-u-1"
          onChange={e => {
            changeZip(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
