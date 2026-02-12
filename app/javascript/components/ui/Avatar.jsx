const Avatar = ({ avatar, alt, className }) => {
  return <img src={avatar} className={"rounded-full " + className} alt={alt} />;
};
export default Avatar;
