import React, {useState, useEffect} from 'react';
import { Row, Col, Modal, Button } from 'antd';
import axios from 'axios';
import "./MethodFeed.css"

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
    const [email, setEmail] = useState({
        email : ""
      });

    const getUser = async () => {
        const data = await axios.get(`http://127.0.0.1:5000/test`, { withCredentials: true })
        console.log(data);
        setEmail(data.data);
      }
    const handleChange = (e, field) => {
        setMethodtitle(e.target.value);
      }
    const showModal = () => {
        setVisible(true);

      };
    
    const handleOk = async () => {
        const body_email = email.email
        const title = methodtitle
        const data = methoddata
        const hypo = methodhypo
        try {
            const method = await axios.post(`http://127.0.0.1:5000/method`, {title, body_email, data, hypo})

            setModalText('Sending Method');
            setConfirmLoading(true);
            setTimeout(() => {
                setVisible(false);
                setConfirmLoading(false);
            }, 500);
        } catch (err) {
            console.error(err.message); 
        }
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
        setMethoddata(dataid);
        console.log(dataid);
        return fetchData(dataid);
    }
    function Borrowhypo(props) {
        const hypoid = window.$hypomethodid
        setMethoddhypo(hypoid);
        return fetchHypo(hypoid);
    }
    useEffect(() => {
        getUser(); 
      }, [])
    return (
    <>
        <div> 
        <Row>
            <Col span={8}> </Col>
            <Col span={4}> <h2>Enter Title for your Method</h2> </Col>
            <Col span={4}>
                <form>
                    <div>
                        <input
                            onChange={(e) => handleChange(e, "methodtitle")}
                            type="text"
                            name="methodtitle"
                            id="methodtitle"
                            value={methodtitle}
                        />
                    </div>
                </form>
            </Col>
            <Col span={8}>
                <div className='right_end'>
                    <Button type="primary" onClick={() => {setMethoddata(window.$datamethodid); setMethoddhypo(window.$hypomethodid); showModal(); Borrowdata();Borrowhypo(); }}>Preview Method</Button>
                </div>
            </Col>

        </Row>
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
