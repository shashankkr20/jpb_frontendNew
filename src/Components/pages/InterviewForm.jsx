import React, { useContext, useState } from 'react';
import './../styles/interviewform.css';
import { MdClose } from 'react-icons/md';
import { UserContext } from '../../Usercontext/UserContext';
import { FaArrowCircleLeft } from 'react-icons/fa';

function InterviewForm({ submit }) {
  const { user } = useContext(UserContext);
  const [emails, setEmails] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [endDate, setEndDate] = useState('');

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (isValidEmail(inputValue)) {
        setEmails((prevEmails) => [inputValue, ...prevEmails]);
        setInputValue('');
        setError('');
      } else {
        setError('Invalid email format');
      }
    }
  };

  const handleForm = async () => {
    if (jobTitle && jobDescription && experienceLevel && emails.length > 0) {
      const interviewData = {
        jobTitle,
        jobDescription,
        experienceLevel,
        candidates: emails,
        endDate,
        userMail: user.companyEmail,
      };

      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/interview/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify(interviewData),
        });

        if (response.ok) {
          const result = await response.json();
          // console.log('Form submitted successfully:', result);
          submit();
          alert('Interview details sent successfully');
        } else {
          console.error('Error submitting form:', response.statusText);
          alert('Failed to send interview details');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting the form');
      }
    } else {
      alert('Fill out all details');
    }
  };

  return (
    <div className="InterviewCont">
      <FaArrowCircleLeft onClick={() => submit()} style={{ cursor: 'pointer' }} />
      <div>
        <label htmlFor="">Job Title</label>
        <input
          type="text"
          placeholder="Enter Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="">Job Description</label>
        <input
          style={{ height: 250 }}
          type="text"
          placeholder="Enter Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="">Experience Level</label>
        <select
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
        >
          <option value="">Select Experience Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
      <div className="addcandidate">
        <label htmlFor="">Add Candidate</label>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="candidateCont">
            {emails.map((email, index) => (
              <div key={index} className="candidate">
                <MdClose onClick={() => setEmails(emails.filter((_, i) => i !== index))} />
                {email}
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Enter email and hit enter"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      </div>
      <div>
        <label htmlFor="">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button onClick={handleForm}>Send</button>
    </div>
  );
}

export default InterviewForm;
