/**
 * Name: ProfileAccountSettings.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file is the parent component for user account settings, including:
 *          - Changing profile picture
*/

import ProfileAccountSettingsFormPhoto from "./ProfileAccountSettingsFormPhoto"

function ProfileAccountSettings() {
  return (
    <div className="h-full flex my-12 flex-col justify-center gap-8 items-start">

      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-base sm:text-lg md:text-2xl font-bold text-neutral-800 dark:text-neutral-50">Add your profile picture</h2>
      </div>

      {/* Render photo upload form component */}
      <ProfileAccountSettingsFormPhoto></ProfileAccountSettingsFormPhoto>
    </div>
  )
}

export default ProfileAccountSettings