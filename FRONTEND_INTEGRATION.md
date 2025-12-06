# Frontend Integration Guide

## React/JavaScript Implementation

### 1. API Service

```javascript
const API_BASE = 'https://your-domain.com/app26/';

const apiCall = async (endpoint, data) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};
```

### 2. Main Component

```jsx
import React, { useState } from 'react';

const AccommodationChecker = () => {
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkAccommodation = async () => {
    setLoading(true);
    try {
      const result = await apiCall('checkAccommodation/', { email });
      if (result.success) {
        setUserData(result.data);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Error checking accommodation');
    }
    setLoading(false);
  };

  const handleAction = async (endpoint, successMessage) => {
    setLoading(true);
    try {
      const result = await apiCall(endpoint, { email });
      if (result.success) {
        alert(successMessage);
        checkAccommodation(); // Refresh data
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Action failed');
    }
    setLoading(false);
  };

  return (
    <div className="accommodation-checker">
      <div className="input-section">
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={checkAccommodation} disabled={loading}>
          Check Accommodation
        </button>
      </div>

      {userData && (
        <div className="user-info">
          <h3>{userData.name}</h3>
          <p>Email: {userData.email}</p>
          <p>Summit ID: {userData.summit_id}</p>
          <p>Hostel: {userData.hostel_allotted || 'Not assigned'}</p>
          <p>Room: {userData.room_number || 'Not assigned'}</p>
          
          {userData.accommodation_group && (
            <div className="group-info">
              <h4>Group: {userData.accommodation_group}</h4>
              <p>Males: {userData.total_males}, Females: {userData.total_females}</p>
            </div>
          )}

          <div className="status">
            <span className={userData.kit_collected ? 'status-yes' : 'status-no'}>
              Summit Kit: {userData.kit_collected ? '✓' : '✗'}
            </span>
            <span className={userData.hospitality_kit_given ? 'status-yes' : 'status-no'}>
              Hospi Kit: {userData.hospitality_kit_given ? '✓' : '✗'}
            </span>
          </div>

          <div className="actions">
            {userData.accommodation_group ? (
              <GroupActions userData={userData} handleAction={handleAction} loading={loading} />
            ) : (
              <IndividualActions userData={userData} handleAction={handleAction} loading={loading} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
```

### 3. Individual Actions Component

```jsx
const IndividualActions = ({ userData, handleAction, loading }) => (
  <div className="individual-actions">
    <h4>Individual Actions</h4>
    <button 
      onClick={() => handleAction('cancelAccommodation/', 'Accommodation cancelled')}
      disabled={loading}
      className="btn-danger"
    >
      Cancel
    </button>
    <button 
      onClick={() => handleAction('markHospiAttendance/', 'Attendance marked')}
      disabled={loading}
    >
      Mark Attendance
    </button>
    <button 
      onClick={() => handleAction('giveHospitalityKit/', 'Hospitality kit given')}
      disabled={loading}
    >
      Give Hospi Kit
    </button>
    <button 
      onClick={() => handleAction('kit/', 'Summit kit given')}
      disabled={loading}
    >
      Give Summit Kit
    </button>
    <button 
      onClick={() => handleAction('completeIndividualProcess/', 'All processes completed')}
      disabled={loading}
      className="btn-primary"
    >
      Complete All
    </button>
  </div>
);
```

### 4. Group Actions Component

```jsx
const GroupActions = ({ userData, handleAction, loading }) => (
  <div className="group-actions">
    <h4>Group Actions</h4>
    <div className="group-buttons">
      <button 
        onClick={() => handleAction('markAllGroupHospiAttendance/', 'Group attendance marked')}
        disabled={loading}
      >
        Mark All Attendance
      </button>
      <button 
        onClick={() => handleAction('giveAllGroupHospiKit/', 'All hospitality kits given')}
        disabled={loading}
      >
        Give All Hospi Kits
      </button>
      <button 
        onClick={() => handleAction('giveAllGroupSummitKit/', 'All summit kits given')}
        disabled={loading}
      >
        Give All Summit Kits
      </button>
      <button 
        onClick={() => handleAction('completeGroupProcess/', 'All group processes completed')}
        disabled={loading}
        className="btn-primary"
      >
        Complete All Group
      </button>
    </div>
    
    <h4>Individual Actions</h4>
    <div className="individual-buttons">
      <button 
        onClick={() => handleAction('markHospiAttendance/', 'Individual attendance marked')}
        disabled={loading}
      >
        Mark Individual
      </button>
      <button 
        onClick={() => handleAction('giveHospitalityKit/', 'Individual hospitality kit given')}
        disabled={loading}
      >
        Give Individual Hospi Kit
      </button>
      <button 
        onClick={() => handleAction('kit/', 'Individual summit kit given')}
        disabled={loading}
      >
        Give Individual Summit Kit
      </button>
      <button 
        onClick={() => handleAction('completeIndividualProcess/', 'Individual processes completed')}
        disabled={loading}
        className="btn-secondary"
      >
        Complete Individual
      </button>
    </div>
  </div>
);
```

### 5. CSS Styles

```css
.accommodation-checker {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.input-section {
  margin-bottom: 20px;
}

.input-section input {
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
}

.user-info {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.group-info {
  background: #e3f2fd;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
}

.status span {
  margin-right: 15px;
  padding: 5px 10px;
  border-radius: 4px;
}

.status-yes { background: #c8e6c9; }
.status-no { background: #ffcdd2; }

.actions button {
  margin: 5px;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary { background: #2196f3; color: white; }
.btn-secondary { background: #ff9800; color: white; }
.btn-danger { background: #f44336; color: white; }

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

### 6. QR Code Integration

```jsx
import { QrReader } from 'react-qr-reader';

const QRScanner = ({ onScan }) => (
  <QrReader
    onResult={(result, error) => {
      if (result) {
        onScan(result?.text);
      }
    }}
    style={{ width: '100%' }}
  />
);

// Usage in main component
const handleQRScan = (scannedEmail) => {
  setEmail(scannedEmail);
  checkAccommodation();
};
```

## Key Features

- **Single User**: 5 buttons (Cancel, Mark Attendance, Give Hospi Kit, Give Summit Kit, Complete All)
- **Group User**: 8 buttons (4 group actions + 4 individual actions)
- **Real-time status updates** after each action
- **QR code scanning** integration
- **Loading states** and error handling
- **Responsive design** for mobile/tablet use

## Error Handling

```javascript
const handleError = (error) => {
  if (error.status === 404) {
    alert('User not found');
  } else if (error.status === 400) {
    alert('Invalid request');
  } else {
    alert('Something went wrong');
  }
};
```