import React from 'react';

export interface UserProfileProps {
  avatarUrl?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  avatarUrl = '/assets/images/77a624073ed39ebd7f349c74e281d671ea53c5c6.png',
}) => {
  return (
    <div className="user-profile-container">
      <img
        src={avatarUrl}
        alt="User Profile"
        className="user-profile-avatar"
      />
      <img
        src="/assets/icons/arrow-bottom.svg"
        alt="Dropdown arrow"
        width="14"
        height="14"
        className="user-profile-arrow"
      />
    </div>
  );
};
