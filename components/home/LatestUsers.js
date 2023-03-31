import {Container, Grid, Text, User} from "@nextui-org/react";
import {selectedUserState, useGlobalToggle} from "../../store";
import {useHookstate} from "@hookstate/core";

const LatestUsers = ({topEnt: users, countTopEnt}) => {
	const state = useGlobalToggle();
	const selectedUser = useHookstate(selectedUserState);

	const onClickUser = user => e => {
		selectedUser.set(user);
		state.toggleOn("userSidebar");
	};

	return (
		<div className={"py-20 bg-gray-100"} style={{backgroundImage: "url(/ent.png)", backgroundSize: "cover", backgroundPosition: "bottom"}}>
			<Container lg>
				<main>
					<h2 className={"font-sans"}>
						Get to know our <span className="text-primary font-serif">Entrepreneurs</span>
					</h2>
					<h3>
						Last month <span className="font-normal"> most active entrepreneurs({countTopEnt})</span>
					</h3>
					<Grid.Container gap={2}>
						{users.map((user, i) => (
							<Grid
								onClick={onClickUser(user)}
								key={user.id}
								xs={12}
								sm={4}
								className={"cursor-pointer flex flex-col text-center items-center mt-4 z-0"}>
								<User size={"xl"} src={user.image} name={""} />
								<h3 className={"mt-4"}>
									{user.name}{" "}
									{user.role && (
										<span
											className={
												"capitalize border-gray-300 text-gray-400 text-xs font-normal border-solid border bg-amber-50 rounded-md px-2"
											}>
											{user.role}
										</span>
									)}
								</h3>
								<Text className={"text-white bg-primary px-3 rounded-full mb-3 mt-1"}>{user.postCount} Ideas</Text>
								<Text className={"px-8"}>{user.bio}</Text>
							</Grid>
						))}
					</Grid.Container>
				</main>
			</Container>
		</div>
	);
};

export default LatestUsers;
