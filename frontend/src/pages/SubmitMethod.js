import React, {useState, useEffect} from 'react';
import { Modal, Button } from 'antd';
import axios from 'axios';

const SubmitMethod = () => {
      //These 2 variables are actually global variables
    const [methodtitle, setMethodtitle] = useState("");
    const [methoddata, setMethoddata] = useState(0);
    const [methodhypo, setMethoddhypo] = useState(0);
    const [gethypo, setGethypo] = useState({
        "created_at" : "", "email_hypos" : "", "hypos" : "", "id" : ""
    });
    const [getdata, setGetdata] = useState({
        "created_at" : "", "email_datas" : "", "datas" : "", "id" : ""
    });
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const handleChange = (e, field) => {
        setMethodtitle(e.target.value);
      }
    const showModal = () => {
        setVisible(true);

      };
    
    const handleOk = () => {
        setModalText('Sending Method');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 500);
    };


    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    const fetchData = async (dataid) => { 
        const response = await axios.get(`http://127.0.0.1:5000/data/${dataid}`)
        console.log(response);  
        const datas = response.data
        setGetdata(datas.data);
    };
    const fetchHypo = async (hypoid) => { 
        //console.log(hypoid);
        const data = await axios.get(`http://127.0.0.1:5000/hypo/${hypoid}`)
        const { hypo } = data.data
        //console.log(hypo);
        setGethypo(hypo);
    };
    function Borrowdata(props) {
        const dataid = window.$datamethodid
        console.log(dataid);
        return fetchData(dataid);
    }
    function Borrowhypo(props) {
        const hypoid = window.$hypomethodid
        return fetchHypo(hypoid);
    }

    return (
    <>
        <div className='entry_box'> 
        <Button onClick={() => {setMethoddata(window.$datamethodid); setMethoddhypo(window.$hypomethodid); showModal(); Borrowdata();Borrowhypo(); }}>Preview Method</Button>
            <form>
                <div className='entry_box'>
                    <input
                        onChange={(e) => handleChange(e, "methodtitle")}
                        type="text"
                        name="methodtitle"
                        id="methodtitle"
                        value={methodtitle}
                    />
                </div>
            </form>
        </div>
        <Modal
        title={methodtitle}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        >
        <p>{modalText}</p>
        <div>
            <h3>Data ID: {methoddata} and Hypo ID: {methodhypo}</h3>
            { gethypo.email_hypos }
            { gethypo.created_at }
            { gethypo.id }
            { gethypo.hypos }
            <br></br>
            { getdata.email_datas }
            { getdata.id }
            { getdata.created_at }
            { getdata.datas }
        </div>
        </Modal>
    </>
    );
}

export default SubmitMethod;