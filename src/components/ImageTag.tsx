const ImageTag = ({src,width,height,id}:{String,String,String,string}) =>{
    return (
        <img
            src={src}
            width={width}
            height={height}
            id={id}
        />
    );
}
export default ImageTag;