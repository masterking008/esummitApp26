# Accommodation QR Scanner Feature

## Overview
A dedicated QR scanner for accommodation management with comprehensive features for both individual and group users.

## Features Implemented

### 1. **New Admin Button**
- Location: Profile screen (admin-only section)
- Button: "Scan QR - Accommodation" with blue QR icon
- Direct access to accommodation-specific scanner

### 2. **Dedicated Scanner Screen** (`AccoQRCode.tsx`)
- Clean, focused interface for accommodation only
- No task selection needed
- Automatic email validation
- "Scan Again" functionality

### 3. **Comprehensive Accommodation Management** (`AccomodationResult.tsx`)

#### User Information Display:
- Name, Email, Summit ID
- Hostel and Room assignment
- Group information (if applicable)
- Status badges for Summit Kit and Hospitality Kit

#### Individual User Actions (5 buttons):
1. **Cancel** - Cancel accommodation
2. **Mark Attendance** - Mark hospitality attendance
3. **Give Hospi Kit** - Distribute hospitality kit
4. **Give Summit Kit** - Distribute summit kit
5. **Complete All** - Complete all individual processes

#### Group User Actions (8 buttons):
**Group Actions:**
1. **Mark All Attendance** - Mark attendance for entire group
2. **Give All Hospi Kits** - Distribute hospitality kits to all
3. **Give All Summit Kits** - Distribute summit kits to all
4. **Complete All Group** - Complete all group processes

**Individual Actions** (same 4 buttons as above for individual member)

## API Endpoints

All endpoints use POST method with `{ email: string }` body:

- `checkAccommodation/` - Get user accommodation details
- `cancelAccommodation/` - Cancel accommodation
- `markHospiAttendance/` - Mark individual attendance
- `giveHospitalityKit/` - Give individual hospitality kit
- `kit/` - Give individual summit kit
- `completeIndividualProcess/` - Complete all individual processes
- `markAllGroupHospiAttendance/` - Mark group attendance
- `giveAllGroupHospiKit/` - Give all group hospitality kits
- `giveAllGroupSummitKit/` - Give all group summit kits
- `completeGroupProcess/` - Complete all group processes

## Files Modified/Created

### Created:
- `src/screens/Profile/AccoQRCode.tsx` - Dedicated accommodation scanner

### Modified:
- `src/screens/Profile/Profile.tsx` - Added admin button
- `src/screens/Profile/index.tsx` - Export new component
- `src/navigation/Screen.tsx` - Added route
- `src/api/user.ts` - Added all accommodation API functions
- `src/components/profile/AccomodationResult.tsx` - Complete rewrite with all features

## Usage

1. Admin logs in
2. Goes to Profile screen
3. Clicks "Scan QR - Accommodation" button
4. Scans user's QR code
5. Views user information and status
6. Performs required actions (individual or group)
7. Clicks "Scan Again" for next user

## UI Features

- Real-time status updates after each action
- Loading states during API calls
- Success/error toast notifications
- Color-coded status badges (green = collected, red = not collected)
- Responsive button layout
- Scrollable interface for small screens
- Group information highlighted in blue
