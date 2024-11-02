/**
 * Database use only
 */
type UserRecord = {
	id: string;
	email: string;
	user_type: "individual" | "team";
	fullname: string;
	country: string;
	is_deleted: boolean;
};

export type UserOutput = Omit<UserRecord, "is_deleted">;

export type UserCreateInput = Pick<UserRecord, "email" | "fullname" | "country" | "user_type"> & { password: string };

export type UserUpdateInput = Partial<Omit<UserRecord, "id">>;
