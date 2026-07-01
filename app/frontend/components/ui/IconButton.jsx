function IconButton(props) {
  return (
    <button
      className="cursor-pointer inline-flex justify-center"
      {...props}
    >{props.children}</button>
  );
}

export default IconButton;
