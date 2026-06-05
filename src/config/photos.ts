export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  color: 'purple' | 'pink' | 'gold' | 'blue';
}

export const photos: PhotoItem[] = [
  {
    id: 'fav_notification',
    url: '/images/fav_notification.png',
    caption: '✨ Meri Favourite Notification',
    color: 'pink',
  },
  {
    id: 'reply_delayer',
    url: '/images/reply_delayer.png',
    caption: '✨ Professional Reply Delayer 😆',
    color: 'purple',
  },
  {
    id: 'mood_improver',
    url: '/images/mood_improver.png',
    caption: '✨ Mood Improver Certified',
    color: 'blue',
  },
  {
    id: 'future_wife',
    url: '/images/future_wife.png',
    caption: '✨ Future Wife ❤️',
    color: 'pink',
  },
  {
    id: 'birthday_queen',
    url: '/images/birthday_queen.png',
    caption: '✨ Birthday Queen 🎂',
    color: 'gold',
  },
  {
    id: 'behind_smiles',
    url: '/images/behind_smiles.png',
    caption: '✨ The Person Behind So Many Smiles',
    color: 'blue',
  },
  {
    id: 'main_character',
    url: '/images/main_character.png',
    caption: '✨ Hamari Story Ki Main Character',
    color: 'purple',
  },
  {
    id: 'smile_fan',
    url: '/images/smile_fan.png',
    caption: '✨ Is Smile Ka Fan Hu',
    color: 'gold',
  },
];

export const specialPhoto = {
  url: '/images/fav_large_photo.png',
  title: 'One Of My Favourite Photos ❤️',
  caption: 'Pata nahi tumhe ye photo kitni pasand hai, lekin mujhe ye isliye pasand hai kyunki isme tum waise hi smile kar rahi ho jaise main hamesha tumhe dekhna chahta hu. ❤️',
};

export const finalPhoto = {
  url: '/images/final_photo.png',
  overlayText: {
    title: 'Happy Birthday Antima ❤️',
    subtitle: 'Thank You For Being\n\nMy Favourite Chat Partner,\nMy Favourite Notification,\nAur Meri Favourite Person. ❤️',
  },
};
