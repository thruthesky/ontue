export const SERVER_ERROR_CODE = {
    CODE_USER_NOT_FOUND_BY_THAT_EMAIL: -42053
};
export const KEY_LOGIN = 'user-login';

export interface REQUEST {
    route?: string;
    session_id?: string;
};


export interface ID {
    ID: number;
};
export interface ID_O {
    ID?: number;
};
export interface CATEGORY {
    category: string;
};
// interface CATEGORY_O {
//     category?: string;
// };


export interface ERROR_RESPONSE {
    code: number;
    message?: string;
};



export interface FILE {
    id: number;
    type: string;          // can be 'false' if file type is not recognized.
    url: string;
    url_thumbnail?: string;
    url_thumbnail_wide?: string; // only available for the first image. @see google doc
    name: string;
};


export type FILES = Array<FILE>;

export interface FILE_DELETE extends REQUEST {
    id?: number;
    guid?: string;
    post_password?: string;
};




export interface USER_LOGIN {
    route?: string;
    user_email: string;
    user_pass: string;
};


export type USER_DATA = REQUEST;


export interface USER_REGISTER extends REQUEST {
    user_email: string;
    user_pass?: string;
    user_login?: string;
    name?: string;
    display_name?: string;
    mobile?: string;
    gender?: string;
    address?: string;
    birthday?: string;
    landline?: string;
    photoURL?: string;
    photo?: FILE;
};

export type USER_UPDATE = USER_REGISTER;
export type USER_DATA_RESPONSE = USER_REGISTER;



export interface USER_LOGIN_RESPONSE extends ID {
    user_email: string;
    display_name: string;
    session_id: string;
    photoURL: string;
    photo: FILE;
    provider: string;
};
export type USER_REGISTER_RESPONSE = USER_LOGIN_RESPONSE;
export type USER_UPDATE_RESPONSE = USER_LOGIN_RESPONSE;





export interface USER_CHANGE_PASSWORD extends REQUEST {
    old_password: string;
    new_password: string;
};







export interface POST_CREATE_COMMON {
    post_title: string;
    post_content?: string;
    post_content_pre?: string;              /// pre process 'post_content' by forum.service.ts that is available only on client end.
    post_password?: string;
    post_author_name?: string;             /// This is anonymous user name when a anonymous post without login.
    post_author_email?: string;            /// post_author_name, post_author_email, post_author_phone_number will only be available on create.
    post_author_phone_number?: string;     /// 'author' field will be available for reading.
    fid?: Array<number>;
    int_1?: number;
    int_2?: number;
    int_3?: number;
    char_1?: string;
    char_2?: string;
    char_3?: string;
    varchar_1?: string;
    varchar_2?: string;
    varchar_3?: string;
    varchar_4?: string;
    varchar_5?: string;
    site_preview_id?: number; /// available only
};


export interface POST_CREATE extends REQUEST, ID_O, CATEGORY, POST_CREATE_COMMON {};
export type POST_CREATE_RESPONSE = number;


export interface POST_READ_COMMON extends ID, POST_CREATE_COMMON {
  author: AUTHOR;
  readonly category_slug?: string; // category. only available on get_post()
  readonly category_option?: CATEGORY_OPTION; // only available on get_post().
  comment_count: number;
  comments: COMMENTS;
  guid: string;
  files: FILES;
  post_date: string;
  post_parent: number;
  post_password?: string; // password does not come from server.
  meta: any;
  shortDate?: string;             /// made by client
  readonly count_images?: number;      /// number of image files. made by server.
  readonly count_files?: number;  /// number of files that are not image. made by server.
  readonly site_preview: SITE_PREVIEW;
};

export interface POST_DATA_RESPONSE extends ID, POST_READ_COMMON { };

export interface POST extends POST_DATA_RESPONSE { };
export type POSTS = Array<POST>;

type THUMBNAIL_SIZES = '32x32' | '64x64' | '100x100' | '160x100' | '200x200' | '400x400' | '800x320' | '800x800';

export interface POST_LIST extends REQUEST {
  category_name: string; // slug. This is not category name. This is how wordpress does. it uses category_name insteadm of 'slug' to search slug.
  posts_per_page?: number; // no of posts in a page.
  paged?: number; // what page.
  thumbnail?: THUMBNAIL_SIZES; // default thumbnail size.
};

export interface POST_LIST_RESPONSE {
  posts: POSTS;
  post_count: number; // no of posts retrived from database. if it is less than POST_LIST.posts_per_page, this may be the last page.
  found_posts: number; // no of total posts found by the search of POST_LIST request. This is the number of posts by the search.
  max_num_pages: number; // no of total pages by the POST_LIST search request.



  //// Below are coming from https://codex.wordpress.org/Class_Reference/WP_Query#Properties $query_vars
  cat: string;                    // catgory no
  category_name: string;          // category name
  comments_per_page: string;      // comments_per_page
  paged: number;                  // paged

  readonly category_option?: CATEGORY_OPTION; // only available on get_post().

};

/**
 * Used by forum.postList(), forum.postSearch()
 *
 * COMMENT differs from COMMENT_DATA_RESPONSE which does not have 'depth' property.
 * 'depth' property comes with the whole list of comments of a post.
 * When you get a comment alone, you cannot have 'depth'.
 */
export interface COMMENT {
  author: AUTHOR;
  comment_ID: number;
  comment_approved: string;
  comment_author: string;
  comment_content: string;
  comment_date: string;
  comment_parent: number;
  comment_post_ID: number;
  comment_type: string;
  depth: number;
  user_id: number;
  files: FILES;
  meta: any;
  site_preview: SITE_PREVIEW;
};

export type COMMENTS = Array<COMMENT>;

export interface AUTHOR {
  ID?: number;
  name?: string;
  email?: string;
  phone_number?: string;
  photoURL?: string;
};

export interface CATEGORY_OPTION {
  file_position: 'top' | 'bottom';
};

export interface SITE_PREVIEW {
  id: number;
  url: string;
  url_image: string;
  title: string;
  content: string;
};

export type PAGE = POST_LIST_RESPONSE;
export type PAGES = PAGE[];


