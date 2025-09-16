import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Context/Store/hooks.ts";
import {
    addItem,
    clearCart,
    removeItem,
    selectActiveCartIndex,
    selectCarts,
    setActiveCart,
} from "../../Context/Store/feature/cart";

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const carts = useAppSelector(selectCarts);
    const activeCartIndex = useAppSelector(selectActiveCartIndex);

    const activeCart = activeCartIndex !== null ? carts[activeCartIndex] : null;

    // Gom nhóm theo item.id (1 món có nhiều size)
    const groupedItems =
        activeCart?.items.reduce((acc, item) => {
            if (!acc[item.id]) {
                acc[item.id] = {
                    id: item.id,
                    name: item.name,
                    image: item.image,
                    sizeToPrices: item.sizeToPrices || [], // giữ toàn bộ size
                    sizes: [],
                };
            }
            acc[item.id].sizes.push(item);
            return acc;
        }, {} as Record<string, any>) || {};

    return (
        <div className="m-2">
            {carts.length > 1 && (
                <div className="mb-4">
                    <h2 className="text-lg font-bold mb-2">Your Restaurant Carts</h2>
                    <div className="flex flex-wrap gap-2">
                        {carts.map((cart, index) => (
                            <button
                                key={cart.restaurantId}
                                onClick={() => dispatch(setActiveCart(index))}
                                className={`px-3 py-2 text-sm rounded-lg ${
                                    activeCartIndex === index
                                        ? "bg-primary text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                            >
                                {cart.restaurantName}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div>
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-bold">
                        {activeCart ? `${activeCart.restaurantName} Cart` : "Your Cart"}
                    </h2>
                    {activeCart && (
                        <button
                            onClick={() => dispatch(clearCart(activeCart.restaurantId))}
                            className="text-red-500 text-sm hover:text-red-700"
                        >
                            Clear Cart
                        </button>
                    )}
                </div>

                {!activeCart || Object.keys(groupedItems).length === 0 ? (
                    <p className="text-gray-500">Your cart is empty</p>
                ) : (
                    <div className="mb-4">
                        {Object.values(groupedItems).map((group: any) => (
                            <div
                                key={group.id}
                                className="flex items-start gap-4 mb-4"
                            >
                                {/* ảnh */}
                                <div className="w-[88px] h-[88px] bg-amber-100 rounded-md flex items-center justify-center">
                                    <img
                                        src={group.image || "/placeholder.png"}
                                        alt={group.name}
                                        className="h-[88px] w-[88px] object-cover rounded-lg"
                                    />
                                </div>

                                {/* thông tin */}
                                <div className="flex-1">
                                    <h3 className="font-medium">{group.name}</h3>

                                    {/* render toàn bộ size */}
                                    {group.sizeToPrices.map((size: any) => {
                                        const sizeItem = group.sizes.find(
                                            (s: any) => s.size === size.size
                                        );
                                        const quantity = sizeItem ? sizeItem.quantity : 0;

                                        return (
                                            <div
                                                key={size.size}
                                                className="flex items-center justify-between mt-1"
                                            >
                                                <p className="text-sm text-gray-500">
                                                    Size: {size.size} -{" "}
                                                    {size.price.toLocaleString()}₫
                                                </p>
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={() =>
                                                            dispatch(
                                                                removeItem({
                                                                    itemId: group.id,
                                                                    size: size.size,
                                                                    restaurantId:
                                                                    activeCart.restaurantId,
                                                                })
                                                            )
                                                        }
                                                        className="bg-gray-200 text-gray-600 px-2 py-1 rounded-md hover:bg-gray-300"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="mx-2">{quantity}</span>
                                                    <button
                                                        onClick={() =>
                                                            dispatch(
                                                                addItem({
                                                                    item: {
                                                                        id: group.id,
                                                                        name: group.name,
                                                                        size: size.size,
                                                                        price: size.price,
                                                                        image: group.image,
                                                                        sizeToPrices: group.sizeToPrices,
                                                                    },
                                                                    restaurantId:
                                                                    activeCart.restaurantId,
                                                                    restaurantName:
                                                                    activeCart.restaurantName,
                                                                })
                                                            )
                                                        }
                                                        className="bg-amber-500 text-white px-2 py-1 rounded-md hover:bg-amber-600"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        <div className="border-t border-gray-100 pt-4 mb-6">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-500">Total</span>
                                <span className="font-medium">
                                    {activeCart.totalAmount.toLocaleString()}₫
                                </span>
                            </div>

                            <button
                                onClick={() => navigate("/checkout")}
                                className="mt-8 w-full text-white py-3 rounded-md font-medium bg-primary hover:bg-amber-600 transition-colors"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
