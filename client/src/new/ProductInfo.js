function ProductInfo(props) {
  return (
    <div className='Comment'>
      <div className='UserInfo'>
        <Avatar avatar={props.avatar} />
        <div className='UserInfo-name'>{props.avatar.name}</div>
      </div>
      <div className='Comment-text'>{props.text}</div>
      <div className='Comment-date'>{formatDate(props.date)}</div>
    </div>
  );
}
