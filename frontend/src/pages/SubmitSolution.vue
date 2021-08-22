<template>
	<form action="/run" method="post" enctype="multipart/form-data">
		<label for="file">Upload and test an HTML file</label><br />
		<input type="file" id="file" name="file" /><br />
		<input type="submit" value="Submit" /><br />
	</form>
</template>
