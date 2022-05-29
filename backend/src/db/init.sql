
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
    is_challenge_active boolean, -- deprecate
    challenge_pose_image_location string,  -- deprecate
    current_active_challenge_id UUID 
);


create table challenges(
    session_id UUID,
    challenge_id UUID,
    challenge_creator_user_id UUID,
    created_at timestamp,
    ended_at timestamp, -- will be NULL for active challenge
    challenge_pose_image_location string
);
