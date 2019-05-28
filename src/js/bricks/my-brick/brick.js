import Brick      from "zengular-brick";
import twig       from "./template.twig";

@Brick.register('my-brick', twig)
export default class MyBrick extends Brick{

	createViewModel(){
		return {name: "elvis presley"};
	}

}