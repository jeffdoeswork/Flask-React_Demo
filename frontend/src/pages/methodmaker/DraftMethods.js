import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';

const DraftMethods = (props) => {
    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);

    const getUserMethods = async () => {
        const data = await axios.get(`http://127.0.0.1:5000/method/${props.obsid}/title/${props.email}`)
        setOptions(data.data.items);
        console.log(data.data.items);
    }

    const handleChange = (event) => {
    setValue(event.target.value);
    };

    useEffect(() => {
    getUserMethods(); 
    console.log(options, "opt topt top");
    }, [])

      return (
        <div>
          <Dropdown
            label="These are all of your current Methods: "
            options={options}
            value={value}
            onChange={handleChange}
          />
        </div>
      );
    };
    
    const Dropdown = ({ label, value, options, onChange }) => {
      return (
        <label>
          {label}
          <select value={value} onChange={onChange}>
            {options.map((option) => (
              <option value={option.id}>{option.title}</option>
            ))}
          </select>
        </label>
      );
    };

    /*const [methods, setMethods] = useState([]);
    const [methodlist, setMethodlist] = useState([]);

    const getUserMethods = async () => {
        const data = await axios.get(`http://127.0.0.1:5000/method/title/${props.email}`)
        setMethods(data.data.items);
        console.log(data.data.items);
    }

    useEffect(() => {
        getUserMethods(); 
        }, [])

    useEffect(() => {
        methods.map(method => {
            setMethodlist([...methodlist, 
                {
                    key: method.id,
                    label: (
                        <a>
                        {method.title}
                        </a>
                    ),
                },
            ]);
        })
        }, [])

    const menu = (
    <Menu
        methodlist
        />
    )

    return (
        <div>
            Hey {props.email}
        <Dropdown overlay={menu}>

        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Edit Your previous Methods Here!
          </Space>
        </a>
      </Dropdown>

    </div>
    );
}*/

export default DraftMethods;