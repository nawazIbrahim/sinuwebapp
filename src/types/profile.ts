// API Response Types
export interface Account {
  accountID: number;
  userID: number;
  personID: number;
  name: string;
  accountType: string;
  accountExpiry: string;
  isPaid: string;
  subscriptionCode: string;
  status: string;
  statusMessage: string;
}

export interface ProfileData {
  profilePhotoUrl: string;
  title: string;
  fullname: string;
  profession: string;
  location?: string;
  profileIntro?: string;
  dataRefId: string;
  shareLink: string;
  enableShareButton: boolean;
}

export interface ContactIcon {
  field: 'call' | 'whatsapp' | 'email' | 'location' | string;
  label: string;
  value: string;
  icon?: string; // Can be font icon name or image URL
  iconColor?: string; // Icon color
  isVisible: boolean;
  displayOrder: number;
}

export interface ProfileGroup {
  group: string; // slug like 'contact', 'skills', etc.
  label: string;
  value: string;
  isVisible: boolean;
  displayOrder: number;
  icon?: string;
  color?: string;
  iconColor?: string;
  subtitle?: string;
}

export interface ProfileApiResponse {
  isSuccess: boolean;
  statusCode: number;
  statusMessage: string | null;
  data: {
    enableAccountSelection: boolean;
    account: Account;
    profile: ProfileData;
    contactIcons: ContactIcon[];
    groupList: ProfileGroup[];
  };
}

// UI-Ready Types (After Adapter)
export interface UIContactIcon extends Omit<ContactIcon, 'isVisible' | 'displayOrder'> {
  iconType: 'font' | 'image' | 'material';
  resolvedIcon: string;
  iconColor: string;
}

export interface UIProfileGroup extends Omit<ProfileGroup, 'isVisible' | 'displayOrder'> {
  route: string;
  iconColor: string;
}

export interface UIProfileData extends ProfileData {
  displayName: string; // Combined title + fullname
}

export interface AdaptedProfileData {
  profile: UIProfileData;
  contactIcons: UIContactIcon[];
  groups: UIProfileGroup[];
}
