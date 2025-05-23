export const mockCategories = [
  {
    id: 1,
    name: 'G-FLIX-1.1',
    createdAt: new Date(),
    updatedAt: new Date(),
    movies: [
      {
        id: 1,
        title: 'Aula 21',
        url: 'https://youtube.com',
        cover: 'https://image.jpg',
        category_id: 1,
        youtube_id: 'abc123',
        createdAt: new Date(),
        updatedAt: new Date(),
        reactions: [],
        favorites: [],
        views: [],
      },
    ],
  },
];

export const mockRawCounts = [
  {
    movieId: '1',
    reactionTypeId: '4',
    count: '1',
  },
];
