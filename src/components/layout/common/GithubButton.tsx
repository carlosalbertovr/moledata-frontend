import { IconButton, Link } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

function GitHubIconButton() {
	return (
		<Link href="https://github.com/carlosalbertovr/moledata-frontend">
			<IconButton
				aria-label="GitHub repository"
				css={{
					_icon: {
						width: "5",
						height: "5",
					},
				}}
				size="sm"
				variant="ghost"
			>
				<FaGithub />
			</IconButton>
		</Link>
	);
}

export default GitHubIconButton;
