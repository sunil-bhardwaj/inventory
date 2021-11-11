function Avatar(props) {
  return (
    <img
      className='Avatar'
      src={props.avatar.avatarUrl}
      alt={props.avatar.name}
    />
  );
}
