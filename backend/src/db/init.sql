
create table users(
    user_id UUID,
    first_name string,
    last_name string,
    email string,
    created_at timestamp,
    hashed_password string
);


create table sessions(
    session_id UUID,
    session_name string,
    creator_user_id string,
    created_at string,
    is_challenge_active boolean,
    challenge_pose_image_location string
);
