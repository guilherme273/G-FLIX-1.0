import { AxiosResponse, AxiosHeaders } from 'axios';

export const fetchYoutubeMock: AxiosResponse = {
  data: {
    kind: 'youtube#videoListResponse',
    etag: 'BclIcmJXnpv63e_KavPtVTMgMD8',
    items: [
      {
        kind: 'youtube#video',
        etag: 'B_mbAozTBrQnftXh-ixt0mqnF7g',
        id: 'T-2OnaS-yZw',
        snippet: {
          publishedAt: '2024-12-24T12:17:06Z',
          channelId: 'UCtM4fMMVCxrXAmqMJ6ZL5Ww',
          title: '[Live] Aulão de Testes em NestJS',
          description: 'Descrição da live...',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/T-2OnaS-yZw/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/T-2OnaS-yZw/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/T-2OnaS-yZw/hqdefault.jpg',
              width: 480,
              height: 360,
            },
            standard: {
              url: 'https://i.ytimg.com/vi/T-2OnaS-yZw/sddefault.jpg',
              width: 640,
              height: 480,
            },
            maxres: {
              url: 'https://i.ytimg.com/vi/T-2OnaS-yZw/maxresdefault.jpg',
              width: 1280,
              height: 720,
            },
          },
          channelTitle: 'LuizTools',
          categoryId: '28',
          liveBroadcastContent: 'none',
          defaultLanguage: 'pt',
          localized: {
            title: '[Live] Aulão de Testes em NestJS',
            description: 'Descrição da live...',
          },
          defaultAudioLanguage: 'en-US',
        },
        contentDetails: {
          duration: 'PT1H54M30S',
          dimension: '2d',
          definition: 'hd',
          caption: 'false',
          licensedContent: true,
          contentRating: {},
          projection: 'rectangular',
        },
        statistics: {
          viewCount: '581',
          likeCount: '63',
          favoriteCount: '0',
          commentCount: '3',
        },
      },
    ],
    pageInfo: {
      totalResults: 1,
      resultsPerPage: 1,
    },
  },
  status: 200,
  statusText: 'OK',
  headers: new AxiosHeaders(),
  config: {
    headers: new AxiosHeaders(),
    method: 'get',
    timeout: 0,
    withCredentials: false,
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    url: 'https://www.googleapis.com/youtube/v3/videos', // opcional
  },
};
