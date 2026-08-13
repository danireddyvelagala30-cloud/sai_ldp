import React from 'react';

export interface UserProfileProps {
  avatarUrl?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  avatarUrl = '/77a624073ed39ebd7f349c74e281d671ea53c5c6.png',
}) => {
  return (
    <div className="hero-avatar" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
      <img
        src={avatarUrl}
        alt="User Profile"
        className="avatar-image"
        style={{ width: '36px', height: '36px', borderRadius: '12px', objectFit: 'cover' }}
      />
      <img src="/arrow-bottom.svg" alt="Dropdown arrow" width="14" height="14" style={{ marginTop: '2px' }} />
    </div>
  );
};
