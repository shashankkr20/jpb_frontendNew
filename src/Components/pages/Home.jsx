import React, { useContext, useEffect, useState } from 'react';
import Header from './Header';
import { MdHomeFilled } from 'react-icons/md';
import './../styles/home.css';
import InterviewForm from './InterviewForm';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Usercontext/UserContext';

function Home() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [formtoggle, setFormToggle] = useState(false);
  const [jobs, setJobs] = useState([]);

  const handleInterview = () => {
    setFormToggle(!formtoggle);
  };

  const handleNotification = async (e) => {
    const cardid = e.target.previousSibling.textContent;
    try {
      const token = await localStorage.getItem('authToken');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/interview/notify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({ _id: cardid }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jobs = await response.json();
      alert(jobs.message);
    } catch (error) {
      console.error('Error in Notification:', error);
    }
  };

  const fetchJobs = async () => {
    try {
      const token = await localStorage.getItem('authToken');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/interview/fetch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({ userMail: user.companyEmail }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jobs = await response.json();
      
      setJobs(jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('authToken')) navigate('/main');
    fetchJobs();
  }, []);

  return (
    <>
      <Header />
      <div className='homeCont'>
        <div className='left-aside'><MdHomeFilled style={{ fontSize: 35, color: '#576474', cursor: "pointer" }} /></div>
        <div className='right-side'>
          {formtoggle ? <InterviewForm submit={() => { setFormToggle(!formtoggle); fetchJobs(); }} /> : <button onClick={handleInterview}>Create Interview</button>}
          {formtoggle ? "" : <>
            <span style={{ marginTop: 20, display: 'block', color: "blue", fontSize: 30, textDecoration: "underline" }}>All Jobs</span>
            <div className='jobs'>
              {jobs.map((job, index) => (
                <div className="job-card" key={index}>
                  <h3>{job.jobTitle}</h3>
                  <p><strong>Description:</strong> {job.jobDescription}</p>
                  <p><strong>Experience Level:</strong> {job.experienceLevel}</p>
                  <p><strong>End Date:</strong> {job.endDate.slice(0, 10)}</p>
                  <p style={{ display: 'none' }}>{job._id}</p>
                  <button className='apply-button' onClick={handleNotification}>Send Notification to candidates</button>
                </div>
              ))}
            </div>
          </>}
        </div>
      </div>
    </>
  );
}

export default Home;
